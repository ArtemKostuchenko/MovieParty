const express = require('express');
const { createGenre, getGenre, updateGenre, deleteGenre, getGenres } = require('../controllers/genre.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').post(authMiddleware, adminMiddleware, createGenre).get(authMiddleware, getGenres);
router.route('/:id').get(authMiddleware, getGenre).patch(authMiddleware, adminMiddleware, updateGenre).delete(authMiddleware, adminMiddleware, deleteGenre);

module.exports = router;