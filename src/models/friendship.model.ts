import { InferSchemaType, Schema, Types, model } from 'mongoose';

const friendshipSchema = new Schema(
    {
        user1_id: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        user2_id: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Accepted'],
            default: 'Pending'
        }
    },
    {
        timestamps: true
    }
);

friendshipSchema.index({ user1_id: 1, user2_id: 1 }, { unique: true });
export type friendshipType = InferSchemaType<typeof friendshipSchema>;

export default model<friendshipType>('Friendship', friendshipSchema);
