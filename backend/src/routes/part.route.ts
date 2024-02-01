import express, { Router } from 'express';
import { createPart, getPart, updatePart, deletePart, getParts } from '../controllers/part.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(adminMiddleware, createPart)
    .get(getParts);

router.route('/:id')
    .get(getPart)
    .patch(adminMiddleware, updatePart)
    .delete(adminMiddleware, deletePart);

export default router;
