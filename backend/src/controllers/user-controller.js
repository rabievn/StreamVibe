import 'express'
import { UserService } from '../services/user-service.js'

export class UserController {
  static async getMe(req, res, next) {
    try {
      const userId = req.body.userId

      if (!userId) {
        return res.status(401).json({ message: 'Нет доступа' })
      }

      const user = await UserService.getUserById(userId)

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }

      return res.json(user)
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : 'Unexpected error' })
      next(err)
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers()

      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'Пользователи не найдены' })
      }

      return res.json(users)
    } catch (e) {
      next(e)
    }
  }
}


