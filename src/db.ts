import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!);
    } catch (error) {
        console.log(error);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
};
