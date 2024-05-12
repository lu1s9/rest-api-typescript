import mongoose from 'mongoose';

export default interface Post {
    content: string;
    // userId: string | null;
    userId: mongoose.Types.ObjectId;
}
