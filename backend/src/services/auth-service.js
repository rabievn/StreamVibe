import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { MailService } from './mail-service.js'
import { TokenService } from './token-service.js'
import { ApiError } from '../exepctions/api-error.js'

export class AuthService {
  static async signUp({ email, password, nickName }) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User already exists`)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const activationLink = uuid.v4()

    const user = await UserModel.create({
      email, password: hashPassword, nickName, activationLink
    })

    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = {
      id: user._id.toString(), email: user.email, nickName: user.nickName, isActivated: user.isActivated
    }

    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens, user: userDto
    }
  }

  static async signIn({ email, password }) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден')
    }

    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw ApiError.Forbidden('Неверный пароль')
    }
    if (!user.isActivated) {
      throw ApiError.Unauthorized('Аккаунт не активирован')
    }

    const userDto = {
      id: user._id.toString(), email: user.email, nickName: user.nickName, isActivated: user.isActivated
    }
    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  static async signOut(refreshToken) {
    if (!refreshToken) {
      return
    }

    await TokenService.removeToken(refreshToken)
  }

  static async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Invalid activation link')
    }

    user.isActivated = true
    user.activationLink = null
    await user.save()
  }

  static async refresh(refreshToken) {
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

    const userDto = {
      id: user._id.toString(),
      email: user.email,
      nickName: user.nickName,
      isActivated: user.isActivated,
      role: user.role
    }

    const tokens = TokenService.generateTokens(userDto)

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}
