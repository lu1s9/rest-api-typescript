import { Router } from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.controller';
import tryCatch from '../libs/tryCatch';
import { validateResource } from '../middlewares/validateResource';
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from '../schemas/post.schema';

import { checkJwt } from '../middlewares/session';

const router = Router();

router.get('/', checkJwt, tryCatch(getPosts));
router.get('/:id', checkJwt, validateResource(getPostSchema), tryCatch(getPost));
router.post('/', checkJwt, validateResource(createPostSchema), tryCatch(createPost));
router.put('/:id', checkJwt, validateResource(updatePostSchema), tryCatch(updatePost));
router.delete('/:id', checkJwt, validateResource(deletePostSchema), tryCatch(deletePost));

export default router;
