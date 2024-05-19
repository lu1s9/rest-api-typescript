import Post from '../models/post.model';

import { CreatePostType, UpdatePostBodyType } from '../schemas/post.schema';

export const getListPosts = async (id: string) => {
    const posts = await Post.find({ userId: id });
    return posts;
};

export const createSinglePost = async (post: CreatePostType, userId: string) => {
    const newPost = new Post({
        content: post.content,
        userId
    });

    const postSaved = await newPost.save();
    return postSaved;
};

export const getSinglePost = async (id: string) => {
    const postFound = await Post.findById(id);
    return postFound;
};

export const deleteSinglePost = async (id: string) => {
    const postFound = await Post.findByIdAndDelete(id);
    return postFound;
};

export const updateSinglePost = async (id: string, updatedData: UpdatePostBodyType) => {
    const task = await Post.findByIdAndUpdate(id, updatedData, { new: true });
    return task;
};
