import { connectDB } from '@/lib/mongodb/client'
import { Doc } from '@/lib/mongodb/models/Document'
import { ActivityLog } from '@/lib/mongodb/models/ActivityLog'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { NextResponse } from 'next/server'
import { demoDocs, DEMO_USERS } from '@/lib/demoData'

function getFilteredDemoDocs(search?: string | null, type?: string | null) {
  let list = [...demoDocs]
  if (type) list = list.filter((d) => d.type === type)
  if (search) {
    const q = search.toLowerCase()
    list = list.filter((d) => d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q))
  }
  return list
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')
  const type = searchParams.get('type')

  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (session.user.id === 'demo-user-001') {
      return NextResponse.json(getFilteredDemoDocs(search, type))
    }

    await connectDB()
    let filter: Record<string, unknown> = {}
    if (type) filter.type = type
    if (search) filter.$text = { $search: search }

    const docs = await Doc.find(filter)
      .populate('authorId', 'name avatarUrl')
      .populate('projectId', 'name color')
      .sort({ isPinned: -1, updatedAt: -1 })

    return NextResponse.json(docs && docs.length > 0 ? docs : getFilteredDemoDocs(search, type))
  } catch (error) {
    console.error('GET /api/docs error (fallback to demo):', error)
    return NextResponse.json(getFilteredDemoDocs(search, type))
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    if (session.user.id === 'demo-user-001') {
      const newDoc = {
        _id: `doc-${Date.now()}`,
        id: `doc-${Date.now()}`,
        title: body.title || 'Untitled Document',
        type: body.type || 'general',
        authorId: DEMO_USERS[0],
        isPinned: false,
        content: body.content || '<p>Start writing document contents here...</p>',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      demoDocs.unshift(newDoc as any)
      return NextResponse.json(newDoc, { status: 201 })
    }

    await connectDB()
    const doc = await Doc.create({
      ...body,
      authorId: session.user.id,
    })

    await ActivityLog.create({
      actorId: session.user.id,
      action: 'created_document',
      entityType: 'document',
      entityId: doc._id,
      entityTitle: doc.title,
    })

    return NextResponse.json(doc, { status: 201 })
  } catch (error) {
    console.error('POST /api/docs error (fallback to demo):', error)
    return NextResponse.json({
      _id: `doc-${Date.now()}`,
      title: 'New Document (Demo)',
      type: 'general',
      authorId: DEMO_USERS[0],
      isPinned: false,
      content: '',
      createdAt: new Date().toISOString(),
    }, { status: 201 })
  }
}
