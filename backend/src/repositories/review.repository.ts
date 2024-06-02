import ReviewModel, {
  Review,
  ReviewWithLikeDislikeCounts,
} from "../models/review.model";
import { BadRequestError, NotFoundError } from "../errors";
import { Request } from "express";
import { validateReview } from "../utils/validations";
import ContentModel from "../models/content.model";
import { Types } from "mongoose";

class ReviewRepository {
  constructor() {}

  async createReview(reviewData: Review, userId: string): Promise<Review> {
    validateReview(reviewData);

    const reviewDoc = await ReviewModel.findOne({
      userId,
      contentId: reviewData.contentId,
    });

    if (reviewDoc) {
      return reviewDoc;
    }

    return await ReviewModel.create({
      ...reviewData,
      userId,
    });
  }

  async likeReviewById(reviewId: string, userId: string) {
    if (!reviewId) {
      throw new BadRequestError("Please provide reviewId");
    }

    const review = await ReviewModel.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    const userObjectId = new Types.ObjectId(userId);

    const likedByUser = review.likes.some((like) => like.equals(userObjectId));
    const dislikedByUser = review.dislikes.some((dislike) =>
      dislike.equals(userObjectId)
    );

    if (likedByUser) {
      review.likes = review.likes.filter((like) => !like.equals(userObjectId));
    } else {
      if (dislikedByUser) {
        review.dislikes = review.dislikes.filter(
          (dislike) => !dislike.equals(userObjectId)
        );
      }
      review.likes.push(userObjectId);
    }

    await review.save();
  }

  async dislikeReviewById(reviewId: string, userId: string) {
    if (!reviewId) {
      throw new BadRequestError("Please provide reviewId");
    }

    const review = await ReviewModel.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    const userObjectId = new Types.ObjectId(userId);

    const likedByUser = review.likes.some((like) => like.equals(userObjectId));
    const dislikedByUser = review.dislikes.some((dislike) =>
      dislike.equals(userObjectId)
    );

    if (dislikedByUser) {
      review.dislikes = review.dislikes.filter(
        (dislike) => !dislike.equals(userObjectId)
      );
    } else {
      if (likedByUser) {
        review.likes = review.likes.filter(
          (like) => !like.equals(userObjectId)
        );
      }
      review.dislikes.push(userObjectId);
    }

    await review.save();
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

  async getReviewsByVideoContentId(videoContentId: string) {
    if (!videoContentId) {
      throw new BadRequestError("Please provide videoContentId");
    }

    const reviews = await ReviewModel.aggregate([
      {
        $match: { contentId: new Types.ObjectId(videoContentId) },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          contentId: 1,
          responseId: 1,
          message: 1,
          likes: { $size: "$likes" },
          dislikes: { $size: "$dislikes" },
          edited: 1,
          responses: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
    ]);

    return reviews.map((review: any) => ({
      _id: review._id,
      userId: review.userId,
      contentId: review.contentId,
      responseId: review.responseId,
      message: review.message,
      likes: review.likes,
      dislikes: review.dislikes,
      edited: review.edited,
      responses: review.responses,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));
  }

  async getBestReviewsByUserId(userId: string) {
    if (!userId) {
      throw new BadRequestError("Please provide userId");
    }

    const reviews = await ReviewModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $addFields: {
          dislikesCount: { $size: "$dislikes" },
        },
      },
      {
        $sort: { likesCount: -1 },
      },
      { $limit: 4 },
      {
        $lookup: {
          from: "videocontents",
          localField: "contentId",
          foreignField: "_id",
          as: "videoContent",
        },
      },
      {
        $unwind: "$videoContent",
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            { $project: { nickname: 1, avatarURL: 1, avatarColor: 1 } },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "typecontents",
          localField: "videoContent.typeVideoContent",
          foreignField: "_id",
          as: "typeVideoContentDetails",
        },
      },
      {
        $addFields: {
          "videoContent.typeVideoContent": {
            $arrayElemAt: ["$typeVideoContentDetails", 0],
          },
        },
      },
      {
        $project: {
          contentId: 0,
          likes: 0,
          dislikes: 0,
          userId: 0,
          typeVideoContentDetails: 0,
        },
      },
    ]);

    return { reviews, totalCount: reviews.length };
  }

  async getReviewsByUserId(userId: string, query: any) {
    if (!userId) {
      throw new BadRequestError("Please provide userId");
    }

    const reviewsPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * reviewsPerPage;

    const reviews = await ReviewModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $addFields: {
          dislikesCount: { $size: "$dislikes" },
        },
      },
      {
        $sort: { likesCount: -1 },
      },
      { $limit: reviewsPerPage },
      { $skip: skip },
      {
        $lookup: {
          from: "videocontents",
          localField: "contentId",
          foreignField: "_id",
          as: "videoContent",
        },
      },
      {
        $unwind: "$videoContent",
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            { $project: { nickname: 1, avatarURL: 1, avatarColor: 1 } },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "typecontents",
          localField: "videoContent.typeVideoContent",
          foreignField: "_id",
          as: "typeVideoContentDetails",
        },
      },
      {
        $addFields: {
          "videoContent.typeVideoContent": {
            $arrayElemAt: ["$typeVideoContentDetails", 0],
          },
        },
      },
      {
        $project: {
          contentId: 0,
          likes: 0,
          dislikes: 0,
          userId: 0,
          typeVideoContentDetails: 0,
        },
      },
    ]);

    return {
      reviews,
      totalCount: await ReviewModel.countDocuments({
        userId: new Types.ObjectId(userId),
      }),
    };
  }

  async getReviews(): Promise<Review[]> {
    return await ReviewModel.find({});
  }
}

export default new ReviewRepository();
