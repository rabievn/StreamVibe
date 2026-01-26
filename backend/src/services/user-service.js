import UserModel from '../models/user-model.js'

export class UserService {
  static async getAllUsers() {
    const users = await UserModel.find()
    return users
  }

  static async getUserById(userId) {
    const user = await UserModel.findById(userId)
    return user
  }
}
