import 'express'
import {UserService} from '../services/user-service.js'

export class UserController {
    static async signUp(req, res, next) {
        try {
            const {email, password, nickName} = req.body
            const data = await UserService.signUp({email, password, nickName})
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }

    static async activate(req, res, next) {
        try {
            const {link} = req.params
            await UserService.activate(link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    static async signIn(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await UserService.signIn({email, password});

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    static async getMe(req, res, next) {
        try {
            const userId = req.body.userId

            if (!userId) {
                return res.status(401).json({message: 'Нет доступа'})
            }

            const user = await UserService.getUserById(userId)

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }

            res.json(user)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: err instanceof Error ? err.message : 'Unexpected error'})
        }
    }

    static async refresh(req, res, next) {
        try {
            res.json({message: 'Sign In'})
        } catch (e) {
            console.log(e)
        }
    }

    static async signOut(req, res, next) {
        try {
            res.json({message: 'Sign In'})
        } catch (e) {
            console.log(e)
        }
    }
}


