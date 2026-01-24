import express from 'express'
import cors from 'cors'
import router from './routes/index.js'
import {errorMiddleware} from './middleware/error-middleware.js'

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL, credentials: true,
}))
app.use(express.json())

app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello from the backend!'})
})

app.use((req, res) => {
    res.status(404).json({message: 'Route not found'})
})

// ⬇️ ВСЕГДА ПОСЛЕДНИМ
app.use(errorMiddleware)

export default app
