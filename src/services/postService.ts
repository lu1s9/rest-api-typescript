import IPost from '../interfaces/post.interface';
import Post from '../models/post.model';
import { CreatePostType } from '../schemas/post.schema';

export const getListPosts = async () => {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return posts;
};

export const createSinglePost = async (post: CreatePostType) => {
    const newPost = new Post({
        content: post.content
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

export const updateSinglePost = async (id: string, updatedData: IPost) => {
    const task = await Post.findByIdAndUpdate(id, updatedData, { new: true });
    return task;
};
