const express = require('express');
const { createDirector, getDirector, updateDirector, deleteDirector, getDirectors } = require('../controllers/director.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createDirector).get(getDirectors);
router.route('/:id').get(getDirector).patch(adminMiddleware, updateDirector).delete(adminMiddleware, deleteDirector);

module.exports = router;