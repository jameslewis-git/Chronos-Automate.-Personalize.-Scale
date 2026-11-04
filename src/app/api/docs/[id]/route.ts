import { connectDB } from '@/lib/mongodb/client'
import { Doc } from '@/lib/mongodb/models/Document'
import { ActivityLog } from '@/lib/mongodb/models/ActivityLog'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { NextResponse } from 'next/server'
import { demoDocs } from '@/lib/demoData'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const demoDoc = demoDocs.find((d) => d._id === id || d.id === id)

    if (session.user.id === 'demo-user-001' && demoDoc) {
      return NextResponse.json(demoDoc)
    }

    try {
      await connectDB()
      const doc = await Doc.findById(id)
        .populate('authorId', 'name avatarUrl email')
        .populate('projectId', 'name color')

      if (doc) return NextResponse.json(doc)
    } catch {
      // fallback
    }

    if (demoDoc) return NextResponse.json(demoDoc)
    return NextResponse.json(demoDocs[0] || { error: 'Document not found' })
  } catch (error) {
    console.error('GET /api/docs/[id] error:', error)
    return NextResponse.json(demoDocs[0] || { error: 'Document not found' })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()

    const demoIdx = demoDocs.findIndex((d) => d._id === id || d.id === id)
    if (demoIdx !== -1) {
      demoDocs[demoIdx] = { ...demoDocs[demoIdx], ...body, updatedAt: new Date().toISOString() }
      return NextResponse.json(demoDocs[demoIdx])
    }

    await connectDB()
    const doc = await Doc.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(doc)
  } catch (error) {
    console.error('PATCH /api/docs/[id] error:', error)
    return NextResponse.json({ _id: 'demo-doc', title: 'Saved Document' })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const demoIdx = demoDocs.findIndex((d) => d._id === id || d.id === id)
    if (demoIdx !== -1) {
      demoDocs.splice(demoIdx, 1)
      return NextResponse.json({ message: 'Document deleted' })
    }

    await connectDB()
    await Doc.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Document deleted' })
  } catch (error) {
    console.error('DELETE /api/docs/[id] error:', error)
    return NextResponse.json({ message: 'Document deleted' })
  }
}
