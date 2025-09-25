// models/User.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  passwordHash: string
  name: string
  userRole: 'admin' | 'user'
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    userRole: { type: String, enum: ['admin', 'user'], required: true },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
