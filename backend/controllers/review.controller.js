const { StatusCodes } = require('http-status-codes');
const ReviewRepository = require('../repositories/review.repository');

const getReview = async (req, res) => {
    const { id: idReview } = req.params;

    const review = await ReviewRepository.getReviewById(idReview);

    return res.status(StatusCodes.OK).json({ data: review });
}

const deleteReview = async (req, res) => {
    const { id: idReview } = req.params;

    await ReviewRepository.deleteReviewById(idReview, req);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getReviews = async (req, res) => {
    const reviews = await ReviewRepository.getReviews();

    return res.status(StatusCodes.OK).json({ data: reviews });
}

module.exports = {
    getReview,
    deleteReview,
    getReviews,
}