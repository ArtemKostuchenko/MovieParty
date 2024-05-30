import ReviewModel, { Review } from "../models/review.model";
import { BadRequestError, NotFoundError } from "../errors";
import { Request } from "express";
import { validateReview } from "../utils/validations";
import ContentModel from "../models/content.model";

class ReviewRepository {
  constructor() {}

  async createReview(reviewData: Review, userId: string): Promise<Review> {
    validateReview(reviewData);

    const reviewDoc = await ReviewModel.findOne({
      userId,
    });

    if (reviewDoc) {
      return reviewDoc;
    }

    return await ReviewModel.create(reviewData);
  }

  async getReviewById(reviewId: string): Promise<Review> {
    const review = await ReviewModel.findById(reviewId)
      .populate("userId")
      .populate("contentId");

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    return review;
  }

  async updateReviewById(
    reviewId: string,
    userId: string,
    reviewData: Review
  ): Promise<Review> {
    const { message } = reviewData;
    const review = await ReviewModel.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    if (!review.userId.equals(userId)) {
      throw new NotFoundError("Review not found");
    }

    review.message = message || review.message;
    review.edited = true;

    return await review.save();
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

  async getReviewsByOriginNameVideoContent(
    originName: string
  ): Promise<Review[]> {
    if (!originName) {
      throw new BadRequestError("Please provide originName");
    }

    const videoContentDoc = await ContentModel.findOne({
      originTitle: { $regex: new RegExp(`^${originName}$`, "i") },
    });

    if (!videoContentDoc) {
      throw new NotFoundError("VideoContent not found");
    }

    return await ReviewModel.find({
      contentId: videoContentDoc._id,
    });
  }

  async getReviews(): Promise<Review[]> {
    return await ReviewModel.find({});
  }
}

export default new ReviewRepository();
