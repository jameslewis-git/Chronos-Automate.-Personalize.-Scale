import { connectDB } from '@/lib/mongodb/client'
import { Workflow } from '@/lib/mongodb/models/Workflow'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { demoWorkflows } from '@/lib/demoData'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const demoWf = demoWorkflows.find((w) => w._id === id || w.id === id)

    if (session.user.id === 'demo-user-001' && demoWf) {
      return NextResponse.json({ workflow: demoWf })
    }

    try {
      await connectDB()
      const workflow = await Workflow.findOne({ _id: id, ownerId: session.user.id }).lean()
      if (workflow) return NextResponse.json({ workflow })
    } catch {
      // fallback
    }

    if (demoWf) return NextResponse.json({ workflow: demoWf })
    return NextResponse.json({ workflow: demoWorkflows[0] })
  } catch (error) {
    console.error('Error fetching workflow:', error)
    return NextResponse.json({ workflow: demoWorkflows[0] })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()

    const demoIdx = demoWorkflows.findIndex((w) => w._id === id || w.id === id)
    if (demoIdx !== -1) {
      demoWorkflows[demoIdx] = { ...demoWorkflows[demoIdx], ...body, updatedAt: new Date().toISOString() }
      return NextResponse.json({ workflow: demoWorkflows[demoIdx] })
    }

    await connectDB()

    const workflow = await Workflow.findOneAndUpdate(
      { _id: id, ownerId: session.user.id },
      { $set: body },
      { new: true }
    ).lean()

    return NextResponse.json({ workflow: workflow || demoWorkflows[0] })
  } catch (error) {
    console.error('Error updating workflow:', error)
    return NextResponse.json({ workflow: demoWorkflows[0] })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const demoIdx = demoWorkflows.findIndex((w) => w._id === id || w.id === id)
    if (demoIdx !== -1) {
      demoWorkflows.splice(demoIdx, 1)
      return NextResponse.json({ success: true })
    }

    await connectDB()
    await Workflow.deleteOne({ _id: id, ownerId: session.user.id })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting workflow:', error)
    return NextResponse.json({ success: true })
  }
}
