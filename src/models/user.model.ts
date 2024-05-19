import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema>;

export default model<UserType>('User', userSchema);
