import UserModel from '../models/user.js'

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId)

  if (!user) return null

  const { passwordHash, ...userData } = user.toObject()
  return userData
}
