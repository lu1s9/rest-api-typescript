import { InferSchemaType, Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        content: { type: String, required: true },
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

export type PostType = InferSchemaType<typeof postSchema>;

export default model<PostType>('Post', postSchema);
