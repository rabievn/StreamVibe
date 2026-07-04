import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/index.js'
import { errorMiddleware } from './middleware/validation.js'
import config from './config/index.js'

const app = express()

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
)

app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

app.use('/api', router)

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'StreamVibe API' })
})

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorMiddleware)

export default app
