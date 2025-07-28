import dotenv from 'dotenv'
import {config} from './config/index.js'
import app from './app.js'
import mongoose from 'mongoose'

dotenv.config()

const start = async () => {
    try {
        await mongoose.connect(config.dbUri)
        app.listen(config.port, () => {
            console.log(`Server started on port ${config.port}`)
        })
    } catch (err) {
        console.error(err)
    }
}

start()


