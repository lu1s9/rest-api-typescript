import { Request, Response } from 'express';
import { GetPostParams } from '../schemas/post.schema';
import { likePostService } from '../services/likesService';

export const likePost = async (req: Request<GetPostParams>, res: Response) => {
    const postID = req.params.id;
    const like = await likePostService(postID, res.locals.user);
    return res.status(200).json(like);
};
