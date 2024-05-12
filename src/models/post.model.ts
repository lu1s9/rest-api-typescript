import { Schema, model } from 'mongoose';
import IPost from '../interfaces/post.interface';

const postSchema = new Schema<IPost>(
    {
        content: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IPost>('Post', postSchema);
