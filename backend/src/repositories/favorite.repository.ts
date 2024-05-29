import UserModel, { User } from "../models/user.model";
import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors";
import { Types } from "mongoose";
import ContentModel from "../models/content.model";

interface Favorite {
  contentId: string | null;
}

class FavoriteRepository {
  constructor() {}

  async addFavoriteVC(favoriteData: Favorite, userId: string): Promise<void> {
    const { contentId } = favoriteData;

    if (!contentId) {
      throw new BadRequestError("Please provide contentId");
    }

    const content = await ContentModel.findById(contentId);

    if (!content) {
      throw new NotFoundError("Content not found");
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new UnAuthorizedError("Invalid credentials");
    }

    const isExist = user.favorites.some((favorite) =>
      favorite.equals(contentId)
    );

    if (isExist) return;

    user.favorites.push(new Types.ObjectId(contentId));

    await user.save();
  }

  async getFavoriteVCById(contentId: string, userId: string) {
    if (!contentId) {
      throw new BadRequestError("Please provide contentId");
    }

    const content = await ContentModel.findById(contentId);

    if (!content) {
      throw new NotFoundError("Content not found");
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new UnAuthorizedError("Invalid credentials");
    }

    const favorite = user.favorites.find((favorite) =>
      favorite.equals(new Types.ObjectId(contentId))
    );

    return favorite ? content : null;
  }

  async deleteFavoriteVC(contentId: string, userId: string): Promise<void> {
    if (!contentId) {
      throw new BadRequestError("Please provide contentId");
    }

    const content = await ContentModel.findById(contentId);

    if (!content) {
      throw new NotFoundError("Content not found");
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new UnAuthorizedError("Invalid credentials");
    }

    user.favorites = user.favorites.filter(
      (favorite) => !favorite.equals(new Types.ObjectId(contentId))
    );

    await user.save();
  }

  async getFavoritesVC(userId: string, query: any) {
    const favoritesPerPage = parseInt(query.limit, 10) || 20;
    const page = parseInt(query.page, 10) || 1;
    const skip = (page - 1) * favoritesPerPage;

    const totalFavoritesAggregation = await UserModel.aggregate([
      { $match: { _id: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "videocontents",
          localField: "favorites",
          foreignField: "_id",
          as: "favorites",
        },
      },
      { $unwind: "$favorites" },
      { $count: "totalFavorites" },
    ]);

    const totalCount = totalFavoritesAggregation[0]?.totalFavorites || 0;

    const favorites = await UserModel.aggregate([
      { $match: { _id: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "videocontents",
          localField: "favorites",
          foreignField: "_id",
          as: "favorites",
        },
      },
      { $unwind: "$favorites" },
      {
        $lookup: {
          from: "typecontents",
          localField: "favorites.typeVideoContent",
          foreignField: "_id",
          as: "favorites.typeVideoContent",
        },
      },
      { $unwind: "$favorites.typeVideoContent" },
      {
        $project: {
          _id: 0,
          favorites: {
            _id: "$favorites._id",
            title: "$favorites.title",
            originTitle: "$favorites.originTitle",
            typeVideoContent: "$favorites.typeVideoContent.path",
            previewURL: "$favorites.previewURL",
          },
        },
      },
      { $skip: skip },
      { $limit: favoritesPerPage },
      {
        $group: {
          _id: null,
          favorites: { $push: "$favorites" },
        },
      },
      {
        $project: {
          _id: 0,
          favorites: 1,
        },
      },
    ]);

    return {
      favorites: favorites?.[0]?.favorites || [],
      totalCount,
    };
  }
}

export default new FavoriteRepository();
