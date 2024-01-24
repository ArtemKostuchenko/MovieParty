const express = require('express');
const { createMovie, getFullMovie, updateMovie, deleteMovie, getMovies } = require('../controllers/movie.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createMovie).get(getMovies);
router.route('/:id').get(getFullMovie).patch(adminMiddleware, updateMovie).delete(adminMiddleware, deleteMovie);

module.exports = router;
