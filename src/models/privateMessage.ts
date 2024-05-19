import { InferSchemaType, Schema, Types, model } from 'mongoose';

const privateMessageSchema = new Schema(
    {
        sender: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export type privateMessageType = InferSchemaType<typeof privateMessageSchema>;

export default model<privateMessageType>('PrivateMessage', privateMessageSchema);
