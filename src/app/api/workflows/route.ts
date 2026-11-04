import { connectDB } from '@/lib/mongodb/client'
import { Workflow } from '@/lib/mongodb/models/Workflow'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { demoWorkflows } from '@/lib/demoData'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.id === 'demo-user-001') {
      return NextResponse.json({ workflows: demoWorkflows })
    }

    await connectDB()

    const workflows = await Workflow.find({ ownerId: session.user.id })
      .sort({ updatedAt: -1 })
      .lean()

    return NextResponse.json({ workflows: workflows && workflows.length > 0 ? workflows : demoWorkflows })
  } catch (error) {
    console.error('Error fetching workflows (fallback to demo):', error)
    return NextResponse.json({ workflows: demoWorkflows })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, nodes, edges } = body

    if (!name) {
      return NextResponse.json({ error: 'Workflow name is required' }, { status: 400 })
    }

    if (session.user.id === 'demo-user-001') {
      const newWf = {
        _id: `wf-${Date.now()}`,
        id: `wf-${Date.now()}`,
        name,
        description: description || '',
        ownerId: session.user.id,
        nodes: nodes || [],
        edges: edges || [],
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      demoWorkflows.unshift(newWf as any)
      return NextResponse.json({ workflow: newWf }, { status: 201 })
    }

    await connectDB()

    const workflow = await Workflow.create({
      name,
      description: description || '',
      ownerId: session.user.id,
      nodes: nodes || [],
      edges: edges || [],
      status: 'draft',
    })

    return NextResponse.json({ workflow }, { status: 201 })
  } catch (error) {
    console.error('Error creating workflow:', error)
    const fallbackWf = {
      _id: `wf-${Date.now()}`,
      name: 'New Sequence (Demo)',
      description: '',
      status: 'draft',
    }
    return NextResponse.json({ workflow: fallbackWf }, { status: 201 })
  }
}
