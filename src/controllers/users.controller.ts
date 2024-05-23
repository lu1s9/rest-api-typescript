import { Request, Response } from 'express';
import { deleteFriendService, getFriendsService, getListUsers, updateFriendship } from '../services/userService';
import { CreateFriendshipType, GetFriendshipParamsType, UpdateFriendshipType } from '../schemas/friendship.schema';
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

export const updateFriendshipController = async (req: Request<GetFriendshipParamsType, unknown, UpdateFriendshipType>, res: Response) => {
    const friendship = await updateFriendship(req.params.id, req.body);
    if (!friendship) {
        res.status(404);
        throw new Error('Friendship not found');
    }
    return res.status(200).json(friendship);
};

export const deleteFriendshipController = async (req: Request<GetFriendshipParamsType>, res: Response) => {
    const friendship = await deleteFriendService(req.params.id);

    if (!friendship) {
        res.status(404);
        throw new Error('Friendship not found');
    }
    return res.status(200).json(friendship);
};
