import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-error.js'

export const validateRequest = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg)
    return next(ApiError.BadRequest('Validation failed', messages))
  }

  next()
}
