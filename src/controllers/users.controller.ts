import { Request, Response } from 'express';
import { getFriendsService, getListUsers } from '../services/userService';
import { CreateFriendshipType } from '../schemas/friendship.schema';
import { createFriendship } from '../services/userService';
import logger from '../libs/logger';

export const getUsers = async (req: Request, res: Response) => {
    logger.info(res.locals.user);
    const listUsers = await getListUsers(`${res.locals.user}`);
    return res.status(200).json(listUsers);
};

export const createFriendshipController = async (req: Request<unknown, unknown, CreateFriendshipType>, res: Response) => {
    const { user1_ID, user2_ID } = req.body;
    const newFriendship = await createFriendship(user1_ID, user2_ID);
    logger.info(newFriendship);
    return res.status(200).json(newFriendship);
};

export const getFriendsController = async (req: Request, res: Response) => {
    const friendsList = await getFriendsService(`${res.locals.user}`);
    logger.info(friendsList);
    return res.status(200).json(friendsList);
};
