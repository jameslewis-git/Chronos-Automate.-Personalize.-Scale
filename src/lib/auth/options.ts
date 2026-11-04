import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/mongodb/client'
import { User } from '@/lib/mongodb/models/User'
import bcrypt from 'bcryptjs'

// ── Demo user — no DB needed ──────────────────────────────────────────────────
export const DEMO_USER = {
  id: 'demo-user-001',
  name: 'James Lewis',
  email: 'james@chronos.demo',
  role: 'admin',
  title: 'Product Lead',
}

export const authOptions: NextAuthOptions = {
  providers: [
    // ── One-click Demo login (no DB, no password) ──
    CredentialsProvider({
      id: 'demo',
      name: 'Demo',
      credentials: {
        token: { label: 'Demo Token', type: 'text' },
      },
      async authorize(credentials) {
        if (credentials?.token === 'demo') {
          return DEMO_USER
        }
        return null
      },
    }),

    // ── Email / Password ──
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        await connectDB()
        const user = await User.findOne({ email: credentials.email.toLowerCase().trim() })

        if (!user) {
          throw new Error('No account found with this email')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),

    // ── Firebase Google Sign-In ──
    // Firebase handles the Google OAuth popup on the client side.
    // After Firebase auth succeeds, the client calls signIn('firebase-google')
    // with the Firebase user's email/name/avatar. This provider finds or
    // creates the MongoDB user and returns a NextAuth session.
    CredentialsProvider({
      id: 'firebase-google',
      name: 'Google',
      credentials: {
        email: { label: 'Email', type: 'email' },
        name: { label: 'Name', type: 'text' },
        avatar: { label: 'Avatar', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error('Email is required')
        }

        await connectDB()

        const email = credentials.email.toLowerCase().trim()
        let user = await User.findOne({ email })

        if (!user) {
          // Auto-create user on first Google sign-in
          user = await User.create({
            name: credentials.name || email.split('@')[0],
            email,
            role: 'member',
            avatarUrl: credentials.avatar || '',
          })
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'member'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
