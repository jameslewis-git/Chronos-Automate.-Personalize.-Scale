import { connectDB } from '@/lib/mongodb/client'
import { Chat } from '@/lib/mongodb/models/Chat'
import { Message } from '@/lib/mongodb/models/Message'
import { User } from '@/lib/mongodb/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { demoChats, DEMO_USERS } from '@/lib/demoData'

// Ensure models are registered
const _User = User;
const _Message = Message;

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (session.user.id === 'demo-user-001') return NextResponse.json(demoChats)

    await connectDB()
    const chats = await Chat.find({
      participants: session.user.id
    })
      .populate('participants', 'name email image role')
      .sort({ lastMessageAt: -1 })

    // Optional: fetch latest message for each chat
    const chatsWithLatestMessage = await Promise.all(
      chats.map(async (chat) => {
        const latestMessage = await Message.findOne({ chatId: chat._id })
          .sort({ createdAt: -1 })
          .lean();
        return {
          ...chat.toObject(),
          latestMessage
        }
      })
    )

    return NextResponse.json(chatsWithLatestMessage)
  } catch (error) {
    console.error('GET /api/chats error:', error)
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (session.user.id === 'demo-user-001') {
      const { isGroup, name, participantIds } = await req.json()
      const participants = DEMO_USERS.filter((u) => u._id === session.user.id || (participantIds || []).includes(u._id))
      const newChat = {
        _id: `chat-${Date.now()}`,
        isGroup: !!isGroup,
        name: isGroup ? name : undefined,
        participants,
        lastMessageAt: new Date().toISOString(),
      }
      demoChats.unshift(newChat as any)
      return NextResponse.json(newChat, { status: 201 })
    }

    await connectDB()
    const { isGroup, name, participantIds } = await req.json()

    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      return NextResponse.json({ error: 'Participants are required' }, { status: 400 })
    }

    const allParticipantIds = [...new Set([...participantIds, session.user.id])]

    // If it's a direct message (not a group), check if a chat already exists between these 2 users
    if (!isGroup) {
      if (allParticipantIds.length !== 2) {
         return NextResponse.json({ error: 'Direct messages require exactly 2 participants' }, { status: 400 })
      }
      
      const existingChat = await Chat.findOne({
        isGroup: false,
        participants: { $all: allParticipantIds, $size: 2 }
      }).populate('participants', 'name email image role')
      
      if (existingChat) {
        return NextResponse.json(existingChat)
      }
    } else {
        if (!name?.trim()) {
           return NextResponse.json({ error: 'Group name is required' }, { status: 400 })
        }
    }

    const newChat = await Chat.create({
      isGroup: isGroup || false,
      name: isGroup ? name.trim() : undefined,
      participants: allParticipantIds,
      admin: isGroup ? session.user.id : undefined
    })

    const populatedChat = await Chat.findById(newChat._id).populate('participants', 'name email image role')

    return NextResponse.json(populatedChat, { status: 201 })
  } catch (error) {
    console.error('POST /api/chats error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
