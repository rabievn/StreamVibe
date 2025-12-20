import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (!token) {
        return res.status(403).json({ message: 'Нет доступа' })
    }

    try {
        // Раскомментируй и настрой, если хочешь проверять токен:
        // const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        // req.userId = decoded.id // или decoded._id в зависимости от структуры токена
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Нет доступа' })
    }
}
