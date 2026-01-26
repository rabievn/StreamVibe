import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { MailService } from './mail-service.js'
import { TokenService } from './token-service.js'

export class AuthService {
  static async signUp({ email, password, nickName }) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`User already exists`)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const activationLink = uuid.v4()

    const user = await UserModel.create({
      email,
      password: hashPassword,
      nickName,
      activationLink
    })

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )

    const userDto = {
      id: user._id,
      email: user.email,
      nickName: user.nickName,
      isActivated: user.isActivated
    }

    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  static async signIn({ email, password, nickName }) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new Error('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw new Error('Неверный пароль')
    }

    const userDto = {
      id: user._id,
      email: user.email,
      nickName: user.nickName,
      isActivated: user.isActivated
    }
    const tokens = TokenService.generateTokens(userDto)
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  static async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw new Error('Invalid activation link')
    }

    user.isActivated = true
    await user.save()
  }

  static async signOut(refreshToken) {
    if (!refreshToken) {
      return
    }

    await TokenService.removeToken(refreshToken)
  }
}
