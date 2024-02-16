import express, { Router } from 'express';
import { createRoom, deleteRoom, inviteUser, getRoom, getRoomByInviteCode, getRoomMessages } from '../controllers/room.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/invite', getRoomByInviteCode);
router.post('/:id/invite', inviteUser);
router.get('/:id/messages', getRoomMessages);

router.route('/')
    .post(createRoom);
router.route('/:id')
    .get(getRoom).delete(deleteRoom);

export default router;