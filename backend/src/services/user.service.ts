import UserModel from '../models/User.js'

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId)

  if (!user) return null

  const { passwordHash, ...userData } = user.toObject()
  return userData
}
