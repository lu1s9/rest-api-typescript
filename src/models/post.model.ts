import { Schema, model } from 'mongoose';
import IPost from '../interfaces/post.interface';

const postSchema = new Schema<IPost>(
    {
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IPost>('Post', postSchema);
