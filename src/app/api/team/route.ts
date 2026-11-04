import { connectDB } from '@/lib/mongodb/client'
import { User } from '@/lib/mongodb/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { NextResponse } from 'next/server'
import { DEMO_USERS } from '@/lib/demoData'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (session.user.id === 'demo-user-001') {
      return NextResponse.json(DEMO_USERS)
    }

    await connectDB()
    const members = await User.find({ isActive: true })
      .select('-password')
      .sort({ role: 1, name: 1 })

    return NextResponse.json(members && members.length > 0 ? members : DEMO_USERS)
  } catch (error) {
    console.error('GET /api/team error (fallback to demo):', error)
    return NextResponse.json(DEMO_USERS)
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { userId, role, title } = await req.json()

    const demoUser = DEMO_USERS.find((u) => u._id === userId)
    if (demoUser) {
      if (role) (demoUser as any).role = role
      if (title) demoUser.title = title
      return NextResponse.json(demoUser)
    }

    // Only admins can update roles
    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    await connectDB()
    const user = await User.findByIdAndUpdate(
      userId,
      { ...(role && { role }), ...(title && { title }) },
      { new: true }
    ).select('-password')

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json(user)
  } catch (error) {
    console.error('PATCH /api/team error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
