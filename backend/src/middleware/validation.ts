import type { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { ApiError } from '../exceptions/api-error.js'

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    })
  }

  const error = err instanceof Error ? err : new Error('Unexpected error')
  console.error(error)

  return res.status(500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  })
}

export const signUpValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters'),
  body('nickName')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Nickname must be between 3 and 30 characters'),
]

export const signInValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

export const resendActivationValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
]
