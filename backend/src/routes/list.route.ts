import express, { Router } from 'express';
import { createList, getList, updateList, deleteList, getLists } from '../controllers/list.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(adminMiddleware, createList)
    .get(getLists);

router.route('/:id')
    .get(getList)
    .patch(adminMiddleware, updateList)
    .delete(adminMiddleware, deleteList);

export default router;
