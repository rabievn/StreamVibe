import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import tokenModel from '../models/token-model.js'
import type { UserPayload } from '../types/user.js'

export class TokenService {
  static generateTokens(payload: UserPayload) {
    const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '30d' })
    return { accessToken, refreshToken }
  }

  static async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    return tokenModel.create({ user: userId, refreshToken })
  }

  static async removeToken(refreshToken: string) {
    if (!refreshToken) return
    await tokenModel.deleteOne({ refreshToken })
  }

  static async findToken(token: string) {
    try {
      return await tokenModel.findOne({ refreshToken: token })
    } catch {
      return null
    }
  }

  static validateRefreshToken(token: string): UserPayload | null {
    try {
      return jwt.verify(token, config.jwtRefreshSecret) as UserPayload
    } catch {
      return null
    }
  }

  static validateAccessToken(token: string): UserPayload | null {
    try {
      return jwt.verify(token, config.jwtAccessSecret) as UserPayload
    } catch {
      return null
    }
  }
}
