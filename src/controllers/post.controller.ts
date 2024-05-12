import { Request, Response } from 'express';
import { createSinglePost, getListPosts, getSinglePost, updateSinglePost, deleteSinglePost } from '../services/postService';

import { CreatePostType, DeletePostParamsType, UpdatePostBodyType, UpdatePostParamsType } from '../schemas/post.schema';
import { RequestExt } from '../interfaces/req-ext';

export const getPosts = async (req: RequestExt, res: Response) => {
    const user = req.user;
    const listPosts = await getListPosts(user!);
    return res.status(200).json(listPosts);
};

export const getPost = async (req: Request, res: Response) => {
    const post = await getSinglePost(req.params.id);
    if (!post) return res.status(404).json('Could not get post. Post not found');
    return res.status(200).json(post);
};
// export const createPost = async (req: Request<unknown, unknown, CreatePostType>, res: Response) => {
export const createPost = async (req: RequestExt, res: Response) => {
    const { content } = req.body;
    const user = req.user;
    const savedPost = await createSinglePost({ content }, user!);
    return res.status(201).json(savedPost);
};
// export const updatePost = async (req: Request<UpdatePostParamsType, unknown, UpdatePostBodyType>, res: Response) => {
export const updatePost = async (req: RequestExt, res: Response) => {
    const user = req.user;
    res.json(user);
    const post = await updateSinglePost(req.params.id, req.body);
    if (!post) return res.status(404).json('Could not update post.Post not found');
    return res.status(200).json(post);
};
export const deletePost = async (req: Request<DeletePostParamsType>, res: Response) => {
    const post = await deleteSinglePost(req.params.id);
    if (!post) return res.status(404).json('Could not delete post. Post not found');
    return res.status(200).json(post);
};
