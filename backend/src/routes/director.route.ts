import express, { Router } from 'express';
import { createDirector, getDirector, updateDirector, deleteDirector, getDirectors } from '../controllers/director.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(adminMiddleware, createDirector)
    .get(getDirectors);

router.route('/:id')
    .get(getDirector)
    .patch(adminMiddleware, updateDirector)
    .delete(adminMiddleware, deleteDirector);

export default router;
