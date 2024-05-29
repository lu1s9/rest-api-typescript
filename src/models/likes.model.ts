import { InferSchemaType, Schema, Types, model } from 'mongoose';

const likeSchema = new Schema(
    {
        postId: {
            type: Types.ObjectId,
            ref: 'Post',
            required: true
        },
        userId: {
            type: Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export type likeType = InferSchemaType<typeof likeSchema>;

export default model<likeType>('Like', likeSchema);
