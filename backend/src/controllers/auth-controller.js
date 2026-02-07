import 'express'
import {AuthService} from '../services/auth-service.js'

export class AuthController {
    static async signUp(req, res, next) {
        try {
            const {email, password, nickName} = req.body
            const data = await AuthService.signUp({email, password, nickName})
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }

    static async activate(req, res, next) {
        try {
            const {link} = req.params
            await AuthService.activate(link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    static async resendActivation(req, res, next) {
        try {
            const {email} = req.body
            await AuthService.resendActivation(email)
            return res.json({ message: 'Письмо отправлено повторно' })
        } catch (e) {
            next(e)
        }
    }

    static async signIn(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await AuthService.signIn({email, password})

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    static async refresh(req, res, next) {
        try {
            const {refreshToken} = req.body

            const userData = await AuthService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: true
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    static async signOut(req, res, next) {
        try {
            const {refreshToken} = req.body

            await AuthService.signOut(refreshToken)
            return res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
}