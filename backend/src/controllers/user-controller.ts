import type { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user-service.js'
import { ApiError } from '../exceptions/api-error.js'

export class UserController {
  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw ApiError.Unauthorized()
      }

      const user = await UserService.getUserById(req.user.id)

      if (!user) {
        throw ApiError.BadRequest('User not found')
      }

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  static async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }
}
