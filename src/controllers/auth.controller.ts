import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail, getUserById } from '../services/authService';
import { signToken } from '../libs/jwt';
import { UserInputType, UserSignupType } from '../schemas/auth.schema';
import logger from '../libs/logger';

export const signup = async (req: Request<unknown, unknown, UserSignupType>, res: Response) => {
    const { email, password, name } = req.body;

    const userFound = await getUserByEmail(email);

    logger.info(`User found ${userFound}`);
    if (userFound) {
        res.status(409);
        throw new Error(`Email ${email} already in use!`);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userCreated = await createUser(email, name, passwordHash);

    logger.info(`user created ${userCreated}`);
    logger.info(`${userCreated.id}`);

    const token = await signToken(`${userCreated.id}`);

    logger.info(`token ${token}`);
    res.cookie('token', token, {
        sameSite: 'none'
    });
    res.cookie('id', userCreated.id, { sameSite: 'none' });

    res.status(200).json({ token, email: userCreated.email, id: userCreated._id });
};

export const login = async (req: Request<unknown, unknown, UserInputType>, res: Response) => {
    const { email, password } = req.body;

    const userFound = await getUserByEmail(email);

    if (!userFound) {
        res.status(401);
        throw new Error(`Invalid email or password`);
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
        res.status(401);
        throw new Error(`Invalid email or password`);
    }

    const token = await signToken(userFound.id);
    res.cookie('token', token, {
        sameSite: 'none'
    });
    res.cookie('id', userFound.id, { sameSite: 'none' });
    res.status(200).json({ token, email: userFound.email, id: userFound._id });
};

export const profile = async (req: Request, res: Response) => {
    const userId = `${res.locals.user}`;
    const userFound = await getUserById(userId);
    return res.status(200).json(userFound);
};
