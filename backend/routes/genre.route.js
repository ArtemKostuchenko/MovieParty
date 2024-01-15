const express = require('express');
const { createGenre, getGenre, updateGenre, deleteGenre, getGenres } = require('../controllers/genre.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createGenre);
router.get('/:id', getGenre);
router.patch('/:id', authMiddleware, adminMiddleware, updateGenre);
router.delete('/:id', deleteGenre);
router.get('/', getGenres);

module.exports = router;