import type { NextFunction, Request, Response } from 'express'
import { TokenService } from '../services/token-service.js'
import { ApiError } from '../exceptions/api-error.js'

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/^Bearer\s?/, '')

  if (!token) {
    return next(ApiError.Unauthorized())
  }

  const userData = TokenService.validateAccessToken(token)
  if (!userData) {
    return next(ApiError.Unauthorized())
  }

  req.user = userData
  next()
}

export const adminMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return next(ApiError.Forbidden('Admin access required'))
  }
  next()
}
