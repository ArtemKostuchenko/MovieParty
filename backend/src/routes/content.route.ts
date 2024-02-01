import express, { Router } from 'express';
import { createVideoContent, getVideoContent, updateVideoContent, deleteVideoContent, getVideoContents } from '../controllers/content.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(adminMiddleware, createVideoContent)
    .get(getVideoContents);

router.route('/:id')
    .get(getVideoContent)
    .patch(adminMiddleware, updateVideoContent)
    .delete(adminMiddleware, deleteVideoContent);

export default router;
