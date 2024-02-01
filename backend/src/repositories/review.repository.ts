import ReviewModel, { Review } from '../models/review.model';
import { NotFoundError } from '../errors';
import { Request } from 'express';

class ReviewRepository {
    constructor() { }

    async createReview(reviewData: Review): Promise<void> {
        
    }

    async getReviewById(reviewId: string): Promise<Review> {
        const review = await ReviewModel.findById(reviewId);

        if (!review) {
            throw new NotFoundError("Review not found");
        }

        return review;
    }

    async updateReviewById(reviewId: string, reviewData: Review): Promise<void> {
        
    }

    async deleteReviewById(reviewId: string, req: Request): Promise<void> {
        const review = await ReviewModel.findById(reviewId);

        if (!review) {
            throw new NotFoundError("Review not found");
        }

        if (review.userId !== req.body.user.userId && !req.body.user.isAdmin) {
            throw new NotFoundError("Review not found");
        }

        await review.deleteOne();
    }

    async getReviews(): Promise<Review[]> {
        return await ReviewModel.find({});
    }
}

export default new ReviewRepository();
