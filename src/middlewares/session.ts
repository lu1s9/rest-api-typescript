import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.TOKEN_SECRET || 'token.01010101';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, JWT_SECRET, (error: any, user: any) => {
        if (error) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        res.locals.user = user.payload;
        next();
    });
};
