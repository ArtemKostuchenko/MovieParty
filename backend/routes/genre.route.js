const express = require('express');
const { createGenre, getGenre, updateGenre, deleteGenre, getGenres } = require('../controllers/genre.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createGenre).get(getGenres);
router.route('/:id').get(getGenre).patch(adminMiddleware, updateGenre).delete(adminMiddleware, deleteGenre);

module.exports = router;