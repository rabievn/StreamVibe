import mongoose, { Schema, type Document, type Types } from 'mongoose'

export interface IToken extends Document {
  user: Types.ObjectId
  refreshToken: string
}

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  refreshToken: { type: String, required: true },
})

export default mongoose.model<IToken>('Token', TokenSchema)
