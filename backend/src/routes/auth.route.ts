import express, { Router } from 'express';
import { register, login, getMe, reqPasswordReset, resetPassword } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = express.Router();

// post
router.post('/register', register);
router.post('/login', login);
router.post('/password/req-reset', reqPasswordReset);
router.post('/password/reset', resetPassword);
router.get('/me', authMiddleware, getMe);

export default router;
