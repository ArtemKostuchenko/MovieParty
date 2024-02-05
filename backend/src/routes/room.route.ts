import express, { Router } from 'express';
import { createRoom, getRoom } from '../controllers/room.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(createRoom);
router.route('/:id')
    .get(getRoom);

export default router;