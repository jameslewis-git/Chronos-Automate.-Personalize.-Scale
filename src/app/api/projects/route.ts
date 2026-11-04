import { connectDB } from '@/lib/mongodb/client'
import { Project } from '@/lib/mongodb/models/Project'
import { ActivityLog } from '@/lib/mongodb/models/ActivityLog'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { NextResponse } from 'next/server'
import { demoProjects, DEMO_USERS } from '@/lib/demoData'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (session.user.id === 'demo-user-001') {
      return NextResponse.json(demoProjects)
    }

    await connectDB()
    const projects = await Project.find()
      .populate('ownerId', 'name avatarUrl')
      .populate('members', 'name avatarUrl')
      .sort({ updatedAt: -1 })

    return NextResponse.json(projects && projects.length > 0 ? projects : demoProjects)
  } catch (error) {
    console.error('GET /api/projects error (fallback to demo):', error)
    return NextResponse.json(demoProjects)
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    if (session.user.id === 'demo-user-001') {
      const newProj = {
        _id: `proj-${Date.now()}`,
        id: `proj-${Date.now()}`,
        name: body.name || 'Untitled Project',
        description: body.description || '',
        color: body.color || '#6366f1',
        status: body.status || 'active',
        ownerId: DEMO_USERS[0],
        members: [DEMO_USERS[0]],
        dueDate: body.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        taskStats: [
          { _id: 'todo', count: 0 },
          { _id: 'in_progress', count: 0 },
          { _id: 'review', count: 0 },
          { _id: 'done', count: 0 },
        ],
      }
      demoProjects.unshift(newProj as any)
      return NextResponse.json(newProj, { status: 201 })
    }

    await connectDB()
    const project = await Project.create({
      ...body,
      ownerId: session.user.id,
      members: [session.user.id, ...(body.members || [])],
    })

    await ActivityLog.create({
      actorId: session.user.id,
      action: 'created_project',
      entityType: 'project',
      entityId: project._id,
      entityTitle: project.name,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('POST /api/projects error (fallback to demo):', error)
    return NextResponse.json({
      _id: `proj-${Date.now()}`,
      name: 'New Project (Demo)',
      status: 'active',
      color: '#6366f1',
      members: [DEMO_USERS[0]],
      taskStats: [],
    }, { status: 201 })
  }
}
