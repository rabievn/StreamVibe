import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 5000
// const mongoUri = process.env.MONGO_URI
// const jwtSecret = process.env.JWT_SECRET

const app = express()

app.get('/', (_req: any, res: any) => {
  res.send('Hello from TypeScript + ESM + ts-node!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
