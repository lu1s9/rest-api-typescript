import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import postRoutes from './post.routes';
import friendRoutes from './friends.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/friends', friendRoutes);

export default router;
