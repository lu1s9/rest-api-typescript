import { Router } from 'express';
import { getFriendsController } from '../controllers/users.controller';
import { validateResource } from '../middlewares/validateResource';
import { createFriendshipSchema } from '../schemas/friendship.schema';
import { createFriendshipController } from '../controllers/users.controller';
import tryCatch from '../libs/tryCatch';
import { checkJwt } from '../middlewares/session';

const router = Router();

router.use(checkJwt);
router.post('/', validateResource(createFriendshipSchema), tryCatch(createFriendshipController));
router.get('/', tryCatch(getFriendsController));

export default router;
