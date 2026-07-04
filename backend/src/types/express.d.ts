import type { UserPayload } from './user.js'

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

export {}
