import { ApiError } from '../exepctions/api-error.js'

export function errorMiddleware(err, req, res, next) {
  console.error(err)

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors || []
    })
  }

  return res.status(500).json({
    message: err.message || 'Unexpected error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  })
}