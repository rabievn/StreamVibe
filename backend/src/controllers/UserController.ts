import { Request, Response } from 'express'
import { getUserById } from '../services/user.service.js'

export const getMe = (req: Request, res: Response) => {
  try {
    const user = getUserById('')

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    res.json(user)
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      res.status(500).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Unexpected error' })
    }
  }
}