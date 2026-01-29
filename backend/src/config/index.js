import dotenv from 'dotenv'

dotenv.config()

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in .env')
}

if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET is not defined in .env')
}

if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined in .env')
}

const config = {
    port: Number(process.env.PORT) || 5000,
    dbUri: process.env.MONGO_URI,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    smtp: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
    }
}

export default config
