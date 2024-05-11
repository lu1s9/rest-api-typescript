import { Router } from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.controller';
import tryCatch from '../libs/tryCatch';
import { validateResource } from '../middlewares/validateResource';
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from '../schemas/post.schema';

const router = Router();

router.get('/posts', tryCatch(getPosts));
router.get('/posts/:id', validateResource(getPostSchema), tryCatch(getPost));
router.post('/posts', validateResource(createPostSchema), tryCatch(createPost));
router.put('/posts/:id', validateResource(updatePostSchema), tryCatch(updatePost));
router.delete('/posts/:id', validateResource(deletePostSchema), tryCatch(deletePost));

export default router;
