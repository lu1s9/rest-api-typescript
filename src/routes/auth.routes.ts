import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';
import tryCatch from '../libs/tryCatch';
import { validateResource } from '../middlewares/validateResource';
import { loginSchema, signupSchema } from '../schemas/auth.schema';
const router = Router();

router.post('/login', validateResource(loginSchema), tryCatch(login));
router.post('/signup', validateResource(signupSchema), tryCatch(signup));

export default router;
