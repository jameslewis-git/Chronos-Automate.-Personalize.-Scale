import { connectDB } from '@/lib/mongodb/client'
import { Lead } from '@/lib/mongodb/models/Lead'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { demoLeads } from '@/lib/demoData'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.id === 'demo-user-001') {
      return NextResponse.json({ leads: demoLeads })
    }

    await connectDB()

    const leads = await Lead.find({ ownerId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(500)
      .lean()

    return NextResponse.json({ leads: leads && leads.length > 0 ? leads : demoLeads })
  } catch (error) {
    console.error('Error fetching leads (fallback to demo):', error)
    return NextResponse.json({ leads: demoLeads })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const demoIdx = demoLeads.findIndex((l) => l._id === id)
    if (demoIdx !== -1) {
      demoLeads.splice(demoIdx, 1)
      return NextResponse.json({ success: true })
    }

    await connectDB()
    await Lead.deleteOne({ _id: id, ownerId: session.user.id })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ success: true })
  }
}
