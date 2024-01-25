const ReviewModel = require('../models/review.model');
const { NotFoundError } = require('../errors');


class ReviewRepository {
    constructor() { }

    async createReview(reviewData) {

    }

    async getReviewById(idReview) {
        const review = await ReviewModel.findById(idReview);

        if (!review) {
            throw new NotFoundError("Review not found");
        }

        return review;
    }

    async updateReviewById(idReview, reviewData) {

    }

    async deleteReviewById(idReview, req) {
        const review = await ReviewModel.findById(idReview);

        if (!review) {
            throw new NotFoundError("Review not found");
        }

        if (review.userId !== req.user.userId && !req.isAdmin) {
            throw new NotFoundError("Review not found");
        }

        await review.deleteOne();
    }

    async getReviews() {
        return await ReviewModel.find({});
    }
}

module.exports = new ReviewRepository();