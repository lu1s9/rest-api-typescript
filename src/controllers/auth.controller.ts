import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '../services/userService';
import { signToken } from '../libs/jwt';
import { UserInputType } from '../schemas/auth.schema';

export const signup = async (req: Request<unknown, unknown, UserInputType>, res: Response) => {
    const { email, password } = req.body;

    const userFound = await getUserByEmail(email);
    if (userFound) {
        res.status(409);
        throw new Error(`Email ${email} already in use!`);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await createUser(email, passwordHash);

    res.sendStatus(204);
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
    res.status(200).json({ token });
};
