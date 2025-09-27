// app/api/users/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongoose'
import { userSchema } from '@/lib/validations/user'
import User from '@/models/User'

export async function GET() {
  await connectDB()
  const users = await User.find().select('-passwordHash') // don’t send password hash
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const parsed = userSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error!.issues }, { status: 400 })
  }

  const { username, password, name, userRole } = parsed.data
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ username, passwordHash, name, userRole })
  return NextResponse.json({ _id: user._id, username, name, userRole }, { status: 201 })
}
