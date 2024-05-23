import Post from '../models/post.model';
import Friendship from '../models/friendship.model';
import { UserType } from '../models/user.model';

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

    const postSaved = (await newPost.save()).populate<{ user: UserType }>('userId', '-password -email -createdAt -updatedAt -__v');
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserAndFriendsPosts = async (loggedInUserId: any) => {
    // 1. Obtener los ObjectId de los amigos del usuario logueado
    const friends = await Friendship.find({
        $or: [
            { user1_id: loggedInUserId, status: 'Accepted' },
            { user2_id: loggedInUserId, status: 'Accepted' }
        ]
    }).exec();

    const friendIds = friends.map((friend) => {
        if (friend.user1_id.toString() === loggedInUserId.toString()) {
            return friend.user2_id;
        } else {
            return friend.user1_id;
        }
    });

    // Agregar el ID del usuario logueado a la lista de IDs
    friendIds.push(loggedInUserId);

    // 2. Obtener las publicaciones de esos usuarios (incluido el usuario logueado)
    const posts = await Post.find({
        userId: { $in: friendIds }
    })
        .sort({ createdAt: -1 })
        .populate<{ user: UserType }>('userId', '-password -email -createdAt -updatedAt -__v')
        .exec(); // Ordenar por fecha de creación descendente

    return posts;
};
