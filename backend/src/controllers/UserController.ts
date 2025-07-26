import { Request, Response } from 'express'
import { getUserById } from '../services/UserService.js'

export const signUp = () => {

}

export const signIn = () => {

}

export const getMe = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ message: 'Нет доступа' })
    }

    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err instanceof Error ? err.message : 'Unexpected error' })
  }
}
