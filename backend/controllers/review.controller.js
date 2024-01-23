const ReviewModel = require('../models/review.model');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getReview = async (req, res) => {
    const { id: idReview } = req.params;

    const review = await ReviewModel.findById(idReview);

    if (!review) {
        throw new NotFoundError("Review not found");
    }

    return res.status(StatusCodes.OK).json({ data: review });
}

const deleteReview = async (req, res) => {
    const { id: idReview } = req.params;

    const review = await ReviewModel.findById(idReview);

    if (!review) {
        throw new NotFoundError("Review not found");
    }

    if (review.userId !== req.user.userId && !req.isAdmin) {
        throw new NotFoundError("Review not found");
    }

    await review.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getReviews = async (req, res) => {
    const reviews = await ReviewModel.find({});

    return res.status(StatusCodes.OK).json({ data: reviews });
}

module.exports = {
    getReview,
    deleteReview,
    getReviews,
}