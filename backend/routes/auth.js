const express = require('express');
const { register, login, getMe } = require('../controllers/auth');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// post
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);


module.exports = router;