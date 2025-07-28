import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (!token) {
        return res.status(403).json({message: 'Нет доступа'});
    }

    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.userId = decoded.id; // or decoded._id depending on how you generate the token
        next();
    } catch (err) {
        return res.status(403).json({message: 'Нет доступа'});
    }
};
