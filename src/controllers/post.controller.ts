import { Request, Response } from 'express';
import { createSinglePost, getListPosts, getSinglePost, updateSinglePost, deleteSinglePost } from '../services/postService';

import { CreatePostType, DeletePostParamsType, UpdatePostBodyType, UpdatePostParamsType } from '../schemas/post.schema';

export const getPosts = async (req: Request, res: Response) => {
    const listPosts = await getListPosts();
    return res.status(200).json(listPosts);
};

export const getPost = async (req: Request, res: Response) => {
    const post = await getSinglePost(req.params.id);
    if (!post) return res.status(404).json('Could not get post. Post not found');
    return res.status(200).json(post);
};
export const createPost = async (req: Request<unknown, unknown, CreatePostType>, res: Response) => {
    const { content } = req.body;
    const savedPost = await createSinglePost({ content });
    return res.status(201).json(savedPost);
};
export const updatePost = async (req: Request<UpdatePostParamsType, unknown, UpdatePostBodyType>, res: Response) => {
    const post = await updateSinglePost(req.params.id, req.body);
    if (!post) return res.status(404).json('Could not update post.Post not found');
    return res.status(200).json(post);
};
export const deletePost = async (req: Request<DeletePostParamsType>, res: Response) => {
    const post = await deleteSinglePost(req.params.id);
    if (!post) return res.status(404).json('Could not delete post. Post not found');
    return res.sendStatus(204);
};
