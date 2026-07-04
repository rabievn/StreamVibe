export class ApiError extends Error {
  status: number
  errors: string[]

  constructor(status: number, message: string, errors: string[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static BadRequest(message: string, errors: string[] = []) {
    return new ApiError(400, message, errors)
  }

  static Unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message)
  }

  static Forbidden(message = 'Forbidden') {
    return new ApiError(403, message)
  }
}
