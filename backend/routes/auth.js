const express = require('express');
const { register, login, getMe, reqPasswordReset, resetPassword } = require('../controllers/auth');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// post
router.post('/register', register);
router.post('/login', login);
router.post('/password/req-reset', reqPasswordReset);
router.post('/password/reset', resetPassword)
router.get('/me', authMiddleware, getMe);


module.exports = router;