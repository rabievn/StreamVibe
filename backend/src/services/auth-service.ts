import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import UserModel from '../models/user-model.js'
import { ApiError } from '../exceptions/api-error.js'
import { MailService } from './mail-service.js'
import { TokenService } from './token-service.js'
import config from '../config/index.js'
import type { AuthResponse, SignInBody, SignUpBody, UserPayload } from '../types/user.js'

import type { IUser } from '../models/user-model.js'

const toUserDto = (user: IUser): UserPayload => ({
  id: String(user._id),
  email: user.email,
  nickName: user.nickName,
  isActivated: user.isActivated,
  role: user.role,
})

export class AuthService {
  static async signUp({ email, password, nickName }: SignUpBody) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest('User already exists')
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const activationLink = uuidv4()

    await UserModel.create({
      email,
      password: hashPassword,
      nickName,
      activationLink,
    })

    await MailService.sendActivationMail(
      email,
      `${config.apiUrl}/api/activate/${activationLink}`,
    )

    return {
      message: 'Registration successful. Please check your email to activate your account.',
    }
  }

  static async signIn({ email, password }: SignInBody): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest('Invalid email or password')
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid email or password')
    }

    if (!user.isActivated) {
      throw ApiError.Forbidden('Account is not activated. Please check your email.')
    }

    const userDto = toUserDto(user)
    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  static async signOut(refreshToken?: string) {
    if (!refreshToken) return
    await TokenService.removeToken(refreshToken)
  }

  static async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Invalid activation link')
    }

    user.isActivated = true
    user.activationLink = null
    await user.save()
  }

  static async refresh(refreshToken?: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw ApiError.Unauthorized()
    }

    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized()
    }

    const user = await UserModel.findById(userData.id)
    if (!user) {
      throw ApiError.Unauthorized()
    }

    const userDto = toUserDto(user)
    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  static async resendActivation(email: string) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest('User not found')
    }

    if (user.isActivated) {
      throw ApiError.BadRequest('Account is already activated')
    }

    const activationLink = uuidv4()
    user.activationLink = activationLink
    await user.save()

    await MailService.sendActivationMail(
      email,
      `${config.apiUrl}/api/activate/${activationLink}`,
    )
  }
}
