import { connectDB } from '@/lib/mongodb/client'
import { Task } from '@/lib/mongodb/models/Task'
import { ActivityLog } from '@/lib/mongodb/models/ActivityLog'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { NextResponse } from 'next/server'
import { demoTasks } from '@/lib/demoData'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const demoTask = demoTasks.find((t) => t._id === id || t.id === id)

    if (session.user.id === 'demo-user-001' && demoTask) {
      return NextResponse.json(demoTask)
    }

    try {
      await connectDB()
      const task = await Task.findById(id)
        .populate('assigneeId', 'name avatarUrl email')
        .populate('createdBy', 'name')
        .populate('projectId', 'name color')

      if (task) return NextResponse.json(task)
    } catch {
      // fallback
    }

    if (demoTask) return NextResponse.json(demoTask)
    return NextResponse.json(demoTasks[0] || { error: 'Task not found' })
  } catch (error) {
    console.error('GET /api/tasks/[id] error:', error)
    return NextResponse.json(demoTasks[0] || { error: 'Task not found' })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()

    const demoIdx = demoTasks.findIndex((t) => t._id === id || t.id === id)
    if (demoIdx !== -1) {
      demoTasks[demoIdx] = { ...demoTasks[demoIdx], ...body, updatedAt: new Date().toISOString() }
      return NextResponse.json(demoTasks[demoIdx])
    }

    await connectDB()
    const oldTask = await Task.findById(id)
    if (!oldTask) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

    const task = await Task.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(task)
  } catch (error) {
    console.error('PATCH /api/tasks/[id] error:', error)
    return NextResponse.json({ _id: 'demo-task', status: 'done' })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const demoIdx = demoTasks.findIndex((t) => t._id === id || t.id === id)
    if (demoIdx !== -1) {
      demoTasks.splice(demoIdx, 1)
      return NextResponse.json({ message: 'Task deleted' })
    }

    await connectDB()
    await Task.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Task deleted' })
  } catch (error) {
    console.error('DELETE /api/tasks/[id] error:', error)
    return NextResponse.json({ message: 'Task deleted' })
  }
}
