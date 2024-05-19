import { Router } from 'express';
import { checkJwt } from '../middlewares/session';
import tryCatch from '../libs/tryCatch';
import { profile } from '../controllers/auth.controller';
import { getUsers } from '../controllers/users.controller';

const router = Router();

router.use(checkJwt);

router.get('/profile', tryCatch(profile));
router.get('/', tryCatch(getUsers));

export default router;
