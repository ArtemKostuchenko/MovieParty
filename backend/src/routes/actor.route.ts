import express, { Router } from 'express';
import { createActor, getActor, updateActor, deleteActor, getActors } from '../controllers/actor.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(adminMiddleware, createActor)
    .get(getActors);

router.route('/:id')
    .get(getActor)
    .patch(adminMiddleware, updateActor)
    .delete(adminMiddleware, deleteActor);

export default router;