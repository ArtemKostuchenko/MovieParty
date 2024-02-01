import express, { Router } from 'express';
import { createSelection, getSelection, updateSelection, deleteSelection, getSelections } from '../controllers/selection.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(adminMiddleware, createSelection)
    .get(getSelections);

router.route('/:id')
    .get(getSelection)
    .patch(adminMiddleware, updateSelection)
    .delete(adminMiddleware, deleteSelection);

export default router;
