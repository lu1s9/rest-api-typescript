import { Router } from 'express';
import { deleteFriendshipController, getFriendsController } from '../controllers/users.controller';
import { validateResource } from '../middlewares/validateResource';
import { createFriendshipSchema } from '../schemas/friendship.schema';
import { updateFriendshipSchema, getFriendshipSchema } from '../schemas/friendship.schema';
import { createFriendshipController, updateFriendshipController } from '../controllers/users.controller';
import tryCatch from '../libs/tryCatch';
import { checkJwt } from '../middlewares/session';

const router = Router();

router.use(checkJwt);
router.post('/', validateResource(createFriendshipSchema), tryCatch(createFriendshipController));
router.put('/:id', validateResource(updateFriendshipSchema), tryCatch(updateFriendshipController));
router.get('/', tryCatch(getFriendsController));
router.delete('/:id', validateResource(getFriendshipSchema), tryCatch(deleteFriendshipController));

export default router;
