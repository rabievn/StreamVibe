import UserModel from '../models/user-model.js'

export const getUserById = async (userId: string) => {
    const user = await UserModel.findById(userId)

    if (!user) return null

    const {password, ...userData} = user.toObject()
    return userData
}
