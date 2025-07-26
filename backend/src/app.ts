import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserController } from './controllers/index.js'
import { checkAuth } from './middleware/UserValidations.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from the backend!' })
})

app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/auth/signIn', checkAuth, UserController.getMe)


export default app
