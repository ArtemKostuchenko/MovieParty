const express = require('express');
const { getReview, deleteReview, getReviews } = require('../controllers/review.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.route('/').get(getReviews);
router.route('/:id').get(getReview).delete(deleteReview);

module.exports = router;