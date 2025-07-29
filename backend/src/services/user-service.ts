import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import {MailService} from "./mail-service.js";

export class UserService {
    static async signUp(email: string, password: string) {
        const candidate = await UserModel.findById({email})
        if (candidate) {
            throw new Error(`User already exists with this ${email}`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPassword, activationLink})

        await MailService.sendActivationMail(email, activationLink)
    }

    static getUserById = async (userId: string) => {
        const user = await UserModel.findById(userId)

        if (!user) return null

        const {password, ...userData} = user.toObject()
        return userData
    }

}

