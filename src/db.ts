import mongoose from 'mongoose';
import logger from './libs/logger';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!);
    } catch (error) {
        logger.error(error);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        logger.error(error);
    }
};
