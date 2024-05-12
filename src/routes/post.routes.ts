import { Router } from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.controller';
import tryCatch from '../libs/tryCatch';
import { validateResource } from '../middlewares/validateResource';
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from '../schemas/post.schema';

import { checkJwt } from '../middlewares/session';

const router = Router();

router.get('/posts', checkJwt, tryCatch(getPosts));
router.get('/posts/:id', checkJwt, validateResource(getPostSchema), tryCatch(getPost));
router.post('/posts', checkJwt, validateResource(createPostSchema), tryCatch(createPost));
router.put('/posts/:id', checkJwt, validateResource(updatePostSchema), tryCatch(updatePost));
router.delete('/posts/:id', checkJwt, validateResource(deletePostSchema), tryCatch(deletePost));

export default router;
