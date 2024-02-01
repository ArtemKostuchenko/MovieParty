import express, { Router } from 'express';
import { createGenre, getGenre, updateGenre, deleteGenre, getGenres } from '../controllers/genre.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(adminMiddleware, createGenre)
    .get(getGenres);

router.route('/:id')
    .get(getGenre)
    .patch(adminMiddleware, updateGenre)
    .delete(adminMiddleware, deleteGenre);

export default router;
