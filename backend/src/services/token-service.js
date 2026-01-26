import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import tokenModel from '../models/token-model.js'

export class TokenService {
  static generateTokens(payload) {
    if (!config.jwtAccessSecret) {
      throw new Error('JWT_ACCESS_SECRET is not defined')
    }
    if (!config.jwtRefreshSecret) {
      throw new Error('JWT_REFRESH_SECRET is not defined')
    }

    const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '30d' })

    return { accessToken, refreshToken }
  }

  static async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
  }

  static async removeToken(refreshToken) {
    if (!refreshToken) {
      return
    }

    await tokenModel.deleteOne({ refreshToken })
  }
}
