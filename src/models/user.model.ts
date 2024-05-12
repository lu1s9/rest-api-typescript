import { Schema, model } from 'mongoose';
import IUser from '../interfaces/user.interface';

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IUser>('User', userSchema);
