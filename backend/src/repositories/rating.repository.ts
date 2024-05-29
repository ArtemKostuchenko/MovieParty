import { Types } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors";
import RatingModel from "../models/rating.model";
import ContentModel from "../models/content.model";

class RatingRepository {
  constructor() {}

  async rateVideoContent(videoContentId: string, userId: string, rate: number) {
    if (!videoContentId || !rate) {
      throw new BadRequestError("Please provide videoContentId, rate");
    }

    const content = await ContentModel.findById(videoContentId);

    if (!content) {
      throw new NotFoundError("Content not found");
    }

    const rated = await RatingModel.findOne({
      videoContentId,
      userId,
    });

    if (rated) {
      throw new BadRequestError("You have already rated this video content");
    }

    await RatingModel.create({
      videoContentId,
      userId,
      rate,
    });
  }

  async getRateByVideoContentAndUserId(videoContentId: string, userId: string) {
    if (!videoContentId) {
      throw new BadRequestError("Please provide videoContentId");
    }

    return await RatingModel.findOne({
      videoContentId,
      userId,
    });
  }
}

export default new RatingRepository();
