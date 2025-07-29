import UserModel from '../models/user-model.js'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'
import tokenModel from '../models/token-model.js'

export class TokenService {
  static generateTokens(payload: any) {
    if (!config.jwtSecret) {
      throw new Error('JWT_SECRET is not defined')
    }
    if (!config.jwtRefreshSecret) {
      throw new Error('JWT_REFRESH_SECRET is not defined')
    }

    const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '30d' })

    return { accessToken, refreshToken }
  }

  static async saveToken(userId: any, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({ user: userId, refreshToken })

    return token
  }
}

