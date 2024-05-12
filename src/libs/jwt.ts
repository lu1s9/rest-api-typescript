import { verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
const JWT_SECRET = process.env.TOKEN_SECRET || 'token.01010101';

export const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
};

export const signToken = async (payload: mongoose.Types.ObjectId): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign({ payload }, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token as string);
            }
        });
    });
};
