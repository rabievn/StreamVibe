import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import {MailService} from './mail-service.js'
import {TokenService} from './token-service.js'

export class UserService {
    static async signUp(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error(`User already exists with this ${email}`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPassword, activationLink})

        await MailService.sendActivationMail(email, activationLink)

        const token = TokenService.generateTokens(user)
        return token
    }

    static async getUserById(userId) {
        const user = await UserModel.findById(userId)

        if (!user) return null

        const {password, ...userData} = user.toObject()
        return userData
    }
}
