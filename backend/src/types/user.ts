export interface UserPayload {
  id: string
  email: string
  nickName?: string
  isActivated: boolean
  role?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserPayload
}

export interface SignUpBody {
  email: string
  password: string
  nickName?: string
}

export interface SignInBody {
  email: string
  password: string
}
