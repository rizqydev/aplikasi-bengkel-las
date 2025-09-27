// models/User.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  passwordHash: string
  name: string
  email: string
  userRole: 'admin' | 'user' | 'technician'
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    userRole: { type: String, enum: ['admin', 'user', 'technician'], required: true },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
