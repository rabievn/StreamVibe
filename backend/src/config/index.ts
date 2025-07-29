import dotenv from 'dotenv'

dotenv.config()
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
}

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in .env');
}
export const config = {
    port: process.env.PORT || 5000,
    dbUri: process.env.MONGO_URI!,
    jwtSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    // nodeEnv: process.env.NODE_ENV || 'development',
}
