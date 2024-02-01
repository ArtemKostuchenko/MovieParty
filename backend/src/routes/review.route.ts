import express, { Router } from 'express';
import { getReview, deleteReview, getReviews } from '../controllers/review.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.route('/')
    .get(getReviews);

router.route('/:id')
    .get(getReview)
    .delete(deleteReview);

export default router;
