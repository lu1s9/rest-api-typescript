import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routeNotFound } from './middlewares/routeNotFound';

import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import errorHandler from './middlewares/errorHandler';

const application = express();

application.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);
application.use(express.json());
application.use(cookieParser());

application.use('/api/', authRoutes);
application.use('/api/', postRoutes);

application.use(routeNotFound);
application.use(errorHandler);

export default application;
