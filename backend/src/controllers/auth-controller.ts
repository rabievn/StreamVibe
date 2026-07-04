import type { NextFunction, Request, Response } from 'express'
import config from '../config/index.js'
import { AuthService } from '../services/auth-service.js'

const REFRESH_COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: config.isProduction,
}

export class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, nickName } = req.body
      const data = await AuthService.signUp({ email, password, nickName })
      res.status(201).json(data)
    } catch (e) {
      next(e)
    }
  }

  static async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { link } = req.params
      await AuthService.activate(link)
      return res.redirect(config.clientUrl)
    } catch (e) {
      next(e)
    }
  }

  static async resendActivation(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body
      await AuthService.resendActivation(email)
      return res.json({ message: 'Activation email sent' })
    } catch (e) {
      next(e)
    }
  }

  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await AuthService.signIn({ email, password })

      res.cookie('refreshToken', userData.refreshToken, REFRESH_COOKIE_OPTIONS)

      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      })
    } catch (e) {
      next(e)
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken as string | undefined

      const userData = await AuthService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, REFRESH_COOKIE_OPTIONS)

      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      })
    } catch (e) {
      next(e)
    }
  }

  static async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken as string | undefined
      await AuthService.signOut(refreshToken)
      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: config.isProduction,
      })
      return res.sendStatus(204)
    } catch (e) {
      next(e)
    }
  }
}
