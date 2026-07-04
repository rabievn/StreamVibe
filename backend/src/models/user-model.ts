import mongoose, { Schema, type Document, type Types } from 'mongoose'

export interface IUser extends Document {
  nickName?: string
  email: string
  password: string
  isActivated: boolean
  activationLink: string | null
  avatarURL: string
  subscription: string
  role: string
  profiles: Types.ObjectId[]
  watchHistory: Types.ObjectId[]
  watchlist: Types.ObjectId[]
  liked: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    nickName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String, default: null },
    avatarURL: { type: String, default: '' },
    subscription: { type: String, default: 'free' },
    role: { type: String, default: 'user' },
    profiles: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    watchHistory: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
    watchlist: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
    liked: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
  },
  { timestamps: true },
)

export default mongoose.model<IUser>('User', UserSchema)
