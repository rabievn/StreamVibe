import dotenv from 'dotenv'
import { config } from './config/index.js'
import app from './app.js'
import mongoose from 'mongoose'

dotenv.config()

mongoose
  .connect(config.dbUri)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`)
    })
  })
  .catch(err => {
    console.error('DB connection error:', err)
    process.exit(1)
  })
