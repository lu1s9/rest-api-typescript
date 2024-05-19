import { Request, Response } from 'express';
import { createSinglePost, getListPosts, getSinglePost, updateSinglePost, deleteSinglePost } from '../services/postService';
import { CreatePostType, DeletePostParamsType, UpdatePostBodyType, UpdatePostParamsType } from '../schemas/post.schema';

export const getPosts = async (req: Request, res: Response) => {
    const listPosts = await getListPosts(`${res.locals.user}`);
    return res.status(200).json(listPosts);
};

export const getPost = async (req: Request, res: Response) => {
    const post = await getSinglePost(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    return res.status(200).json(post);
};

export const createPost = async (req: Request<unknown, unknown, CreatePostType>, res: Response) => {
    const { content } = req.body;
    const savedPost = await createSinglePost({ content }, `${res.locals.user}`);
    return res.status(201).json(savedPost);
};

export const updatePost = async (req: Request<UpdatePostParamsType, unknown, UpdatePostBodyType>, res: Response) => {
    const post = await updateSinglePost(req.params.id, req.body);
    if (!post) {
        res.status(404);
        throw new Error(`Post not found`);
    }
    return res.status(200).json(post);
};

export const deletePost = async (req: Request<DeletePostParamsType>, res: Response) => {
    const post = await deleteSinglePost(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    return res.status(200).json(post);
};
