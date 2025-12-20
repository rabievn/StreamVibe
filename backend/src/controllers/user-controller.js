import 'express'
import {UserService} from '../services/user-service.js'

export class UserController {
    static async signUp(req, res, next) {
        try {
            res.json({message: 'Sign Up'})
        } catch (e) {
            console.log(e)
        }
    }

    static async signIn(req, res, next) {
        try {
            res.json({message: 'Sign In'})
        } catch (e) {
            console.log(e)
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


