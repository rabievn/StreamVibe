import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 5000,
  dbUri: process.env.MONGO_URI!
  // jwtSecret: process.env.JWT_SECRET!,
  // nodeEnv: process.env.NODE_ENV || 'development',
}
