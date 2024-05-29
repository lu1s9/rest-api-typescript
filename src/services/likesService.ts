import { Types } from 'mongoose';
import Post from '../models/post.model';

export const likePostService = async (postID: string, currentUserID: Types.ObjectId) => {
    const post = await Post.findById(postID);
    let postUpdated;

    if (post?.likes.includes(currentUserID)) {
        postUpdated = await Post.findByIdAndUpdate(
            postID,
            {
                $pull: { likes: currentUserID }
            },
            { new: true }
        ).select('likes');
    } else {
        postUpdated = await Post.findByIdAndUpdate(
            postID,
            {
                $push: { likes: currentUserID }
            },
            { new: true }
        ).select('likes');
    }
    return postUpdated;
};
