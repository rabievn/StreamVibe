import UserModel from '../models/user-model.js'

const PUBLIC_USER_FIELDS = '-password -activationLink'

export class UserService {
  static async getAllUsers() {
    return UserModel.find().select(PUBLIC_USER_FIELDS)
  }

  static async getUserById(userId: string) {
    return UserModel.findById(userId).select(PUBLIC_USER_FIELDS)
  }
}
