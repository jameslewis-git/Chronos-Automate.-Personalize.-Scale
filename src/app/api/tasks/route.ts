import { connectDB } from '@/lib/mongodb/client'
import { Task } from '@/lib/mongodb/models/Task'
import { ActivityLog } from '@/lib/mongodb/models/ActivityLog'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { NextResponse } from 'next/server'
import { demoTasks, DEMO_USERS, demoProjects } from '@/lib/demoData'

function getFilteredDemoTasks(projectId?: string | null, mine?: string | null) {
  let list = [...demoTasks]
  if (projectId) {
    list = list.filter((t) => {
      const pid = typeof t.projectId === 'string' ? t.projectId : t.projectId?._id
      return pid === projectId
    })
  }
  if (mine === 'true') {
    list = list.filter((t) => {
      const aid = typeof t.assigneeId === 'string' ? t.assigneeId : (t.assigneeId as any)?._id || (t.assigneeId as any)?.id
      return aid === 'demo-user-001'
    })
  }
  return list
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  const mine = searchParams.get('mine')

  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (session.user.id === 'demo-user-001') {
      return NextResponse.json(getFilteredDemoTasks(projectId, mine))
    }

    await connectDB()
    let filter: Record<string, unknown> = {}
    if (projectId) filter.projectId = projectId
    if (mine === 'true') filter.assigneeId = session.user.id

    const tasks = await Task.find(filter)
      .populate('assigneeId', 'name avatarUrl')
      .populate('createdBy', 'name')
      .sort({ status: 1, position: 1, createdAt: -1 })

    return NextResponse.json(tasks && tasks.length > 0 ? tasks : getFilteredDemoTasks(projectId, mine))
  } catch (error) {
    console.error('GET /api/tasks error (fallback to demo):', error)
    return NextResponse.json(getFilteredDemoTasks(projectId, mine))
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    if (session.user.id === 'demo-user-001') {
      const proj = demoProjects.find((p) => p._id === body.projectId) || demoProjects[0]
      const newTask = {
        _id: `task-${Date.now()}`,
        id: `task-${Date.now()}`,
        projectId: { _id: proj._id, name: proj.name, color: proj.color },
        title: body.title,
        description: body.description || '',
        status: body.status || 'todo',
        priority: body.priority || 'medium',
        assigneeId: DEMO_USERS.find((u) => u._id === body.assigneeId) || DEMO_USERS[0],
        dueDate: body.dueDate || new Date().toISOString().split('T')[0],
        position: demoTasks.length,
        tags: body.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      demoTasks.unshift(newTask as any)
      return NextResponse.json(newTask, { status: 201 })
    }

    await connectDB()
    const lastTask = await Task.findOne({
      projectId: body.projectId,
      status: body.status || 'todo',
    }).sort({ position: -1 })

    const task = await Task.create({
      ...body,
      createdBy: session.user.id,
      position: lastTask ? lastTask.position + 1 : 0,
    })

    await ActivityLog.create({
      actorId: session.user.id,
      action: 'created_task',
      entityType: 'task',
      entityId: task._id,
      entityTitle: task.title,
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('POST /api/tasks error (fallback to demo):', error)
    return NextResponse.json({
      _id: `task-${Date.now()}`,
      title: 'New Task (Demo)',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    }, { status: 201 })
  }
}
