import config from './config/index.js'
import app from './app.js'
import mongoose from 'mongoose'

const start = async () => {
  try {
    await mongoose.connect(config.dbUri)
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`)
    })
  } catch (err) {
    console.error('Server error:', err)
    process.exit(1)
  }
}

start()
