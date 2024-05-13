import mongoose from 'mongoose';

export default interface Post {
    content: string;
    userId: mongoose.Types.ObjectId;
}
