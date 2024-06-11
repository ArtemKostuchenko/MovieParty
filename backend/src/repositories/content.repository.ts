import { Types, PipelineStage } from "mongoose";
import { validateVideoContent } from "../utils/validations";
import { NotFoundError } from "../errors";
import VideoContentModel, { VideoContent } from "../models/content.model";
import mongoose from "mongoose";
import { convertBodyVideoContent } from "../utils/functions";
import TypeContentModel from "../models/type-content.model";
import GenreModel from "../models/genre.model";
import ListModel from "../models/list.model";
import ActorModel from "../models/actor.model";
import DirectorModel from "../models/director.model";
import SelectionModel from "../models/selection.model";

interface Query {
  title?: { $regex: string; $options: string };
  originTitle?: { $regex: string; $options: string };
  $or?: object[];
  rating?: { $gte: number; $lte: number };
  genre?: string;
  genres?: { $all: Types.ObjectId[] };
  actors?: { $all: string[] };
  directors?: { $all: string[] };
  lists?: { $all: string[] } | { $elemMatch: { idList: Types.ObjectId } };
  [key: string]: any;
}

class VideoContentRepository {
  constructor() {}

  async createVideoContent(
    videoContentData: VideoContent
  ): Promise<VideoContent> {
    const convertedVideoContentData = convertBodyVideoContent(videoContentData);
    validateVideoContent(convertedVideoContentData);

    return await VideoContentModel.create(convertedVideoContentData);
  }

  async getVideoContentById(
    videoContentId: string,
    userId: string
  ): Promise<VideoContent> {
    const videoContents = await VideoContentModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(videoContentId) } },
      {
        $lookup: {
          from: "typecontents",
          localField: "typeVideoContent",
          foreignField: "_id",
          as: "typeVideoContent",
        },
      },
      {
        $unwind: {
          path: "$typeVideoContent",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "originCountries",
          foreignField: "_id",
          as: "originCountries",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $lookup: {
          from: "actors",
          localField: "actors",
          foreignField: "_id",
          as: "actors",
        },
      },
      {
        $lookup: {
          from: "directors",
          localField: "directors",
          foreignField: "_id",
          as: "directors",
        },
      },
      {
        $addFields: {
          originalLists: "$lists",
        },
      },
      {
        $lookup: {
          from: "lists",
          localField: "originalLists.idList",
          foreignField: "_id",
          as: "lists",
        },
      },
      {
        $addFields: {
          lists: {
            $map: {
              input: "$lists",
              as: "list",
              in: {
                _id: "$$list._id",
                name: "$$list.name",
                placeInList: {
                  $arrayElemAt: [
                    "$originalLists.placeInList",
                    { $indexOfArray: ["$originalLists.idList", "$$list._id"] },
                  ],
                },
              },
            },
          },
        },
      },
      { $unset: "originalLists" },
      {
        $lookup: {
          from: "parts",
          localField: "part",
          foreignField: "_id",
          as: "part",
        },
      },
      { $unwind: { path: "$part", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "videocontents",
          localField: "part._id",
          foreignField: "part",
          as: "part.contents",
        },
      },
      {
        $addFields: {
          "part.contents": {
            $map: {
              input: "$part.contents",
              as: "content",
              in: {
                _id: "$$content._id",
                title: "$$content.title",
                IMDb: "$$content.IMDb",
                releaseDate: "$$content.releaseDate",
              },
            },
          },
        },
      },
      {
        $sort: {
          "part.contents.releaseDate": 1,
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "videoContentId",
          as: "ratings",
        },
      },
      {
        $addFields: {
          rating: {
            averageRating: { $avg: "$ratings.rate" },
            voteCount: { $size: "$ratings" },
          },
        },
      },
      {
        $lookup: {
          from: "ratings",
          let: { videoContentId: "$_id", userId: new Types.ObjectId(userId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$videoContentId", "$$videoContentId"] },
                    { $eq: ["$userId", "$$userId"] },
                  ],
                },
              },
            },
            { $limit: 1 },
          ],
          as: "userRating",
        },
      },
      {
        $addFields: {
          ratedByMe: { $gt: [{ $size: "$userRating" }, 0] },
        },
      },
      {
        $project: {
          ratings: 0,
          userRating: 0,
        },
      },
      {
        $addFields: {
          genres: {
            $sortArray: { input: "$genres", sortBy: { name: 1 } },
          },
        },
      },
    ]);

    const videoContent = videoContents[0];

    if (!videoContent) {
      throw new NotFoundError("VideoContent not found");
    }

    return videoContent;
  }

  async getVideoContentByOriginTitle(
    originTitle: string,
    userId: string
  ): Promise<VideoContent> {
    const videoContent = await VideoContentModel.findOneAndUpdate(
      { originTitle: { $regex: originTitle, $options: "i" } },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!videoContent) {
      throw new NotFoundError("VideoContent not found");
    }

    const enrichedVideoContents = await VideoContentModel.aggregate([
      { $match: { _id: videoContent._id } },
      {
        $lookup: {
          from: "typecontents",
          localField: "typeVideoContent",
          foreignField: "_id",
          as: "typeVideoContent",
        },
      },
      {
        $unwind: {
          path: "$typeVideoContent",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "originCountries",
          foreignField: "_id",
          as: "originCountries",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $lookup: {
          from: "actors",
          localField: "actors",
          foreignField: "_id",
          as: "actors",
        },
      },
      {
        $lookup: {
          from: "directors",
          localField: "directors",
          foreignField: "_id",
          as: "directors",
        },
      },
      {
        $addFields: {
          actors: {
            $map: {
              input: "$actors",
              as: "actor",
              in: {
                _id: "$$actor._id",
                firstName: "$$actor.firstName",
                lastName: "$$actor.lastName",
                firstNameEng: "$$actor.firstNameEng",
                lastNameEng: "$$actor.lastNameEng",
                photoURL: "$$actor.photoURL",
                dateBirth: "$$actor.dateBirth",
                dateDeath: "$$actor.dateDeath",
                age: {
                  $cond: {
                    if: { $ifNull: ["$$actor.dateDeath", false] },
                    then: {
                      $subtract: [
                        { $year: "$$actor.dateDeath" },
                        { $year: "$$actor.dateBirth" },
                      ],
                    },
                    else: {
                      $subtract: [
                        { $year: "$$NOW" },
                        { $year: "$$actor.dateBirth" },
                      ],
                    },
                  },
                },
                placeBirth: "$$actor.placeBirth",
                sex: "$$actor.sex",
              },
            },
          },
          directors: {
            $map: {
              input: "$directors",
              as: "director",
              in: {
                _id: "$$director._id",
                firstName: "$$director.firstName",
                lastName: "$$director.lastName",
                firstNameEng: "$$director.firstNameEng",
                lastNameEng: "$$director.lastNameEng",
                photoURL: "$$director.photoURL",
                dateBirth: "$$director.dateBirth",
                dateDeath: "$$director.dateDeath",
                age: {
                  $cond: {
                    if: { $ifNull: ["$$director.dateDeath", false] },
                    then: {
                      $subtract: [
                        { $year: "$$director.dateDeath" },
                        { $year: "$$director.dateBirth" },
                      ],
                    },
                    else: {
                      $subtract: [
                        { $year: "$$NOW" },
                        { $year: "$$director.dateBirth" },
                      ],
                    },
                  },
                },
                placeBirth: "$$director.placeBirth",
                sex: "$$director.sex",
              },
            },
          },
        },
      },
      {
        $addFields: {
          originalLists: "$lists",
        },
      },
      {
        $lookup: {
          from: "lists",
          localField: "originalLists.idList",
          foreignField: "_id",
          as: "lists",
        },
      },
      {
        $addFields: {
          lists: {
            $map: {
              input: "$lists",
              as: "list",
              in: {
                list: {
                  _id: "$$list._id",
                  name: "$$list.name",
                },
                placeInList: {
                  $arrayElemAt: [
                    "$originalLists.placeInList",
                    { $indexOfArray: ["$originalLists.idList", "$$list._id"] },
                  ],
                },
              },
            },
          },
        },
      },
      { $unset: "originalLists" },
      {
        $lookup: {
          from: "parts",
          localField: "part",
          foreignField: "_id",
          as: "part",
        },
      },
      { $unwind: { path: "$part", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "videocontents",
          localField: "part._id",
          foreignField: "part",
          as: "part.contents",
        },
      },
      {
        $addFields: {
          "part.contents": {
            $map: {
              input: "$part.contents",
              as: "content",
              in: {
                _id: "$$content._id",
                typeVideoContent: "$$content.typeVideoContent",
                title: "$$content.title",
                originTitle: "$$content.originTitle",
                IMDb: "$$content.IMDb",
                backgroundURL: "$$content.backgroundURL",
                releaseDate: "$$content.releaseDate",
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "typecontents",
          localField: "part.contents.typeVideoContent",
          foreignField: "_id",
          as: "partContentsTypeVideoContent",
        },
      },
      {
        $addFields: {
          "part.contents": {
            $map: {
              input: "$part.contents",
              as: "content",
              in: {
                _id: "$$content._id",
                typeVideoContent: {
                  $arrayElemAt: [
                    "$partContentsTypeVideoContent",
                    {
                      $indexOfArray: [
                        "$partContentsTypeVideoContent._id",
                        "$$content.typeVideoContent",
                      ],
                    },
                  ],
                },
                title: "$$content.title",
                originTitle: "$$content.originTitle",
                IMDb: "$$content.IMDb",
                backgroundURL: "$$content.backgroundURL",
                releaseDate: "$$content.releaseDate",
              },
            },
          },
        },
      },
      {
        $sort: {
          "part.contents.releaseDate": 1,
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "videoContentId",
          as: "ratings",
        },
      },
      {
        $addFields: {
          rating: {
            averageRating: { $avg: "$ratings.rate" },
            voteCount: { $size: "$ratings" },
          },
        },
      },
      {
        $lookup: {
          from: "ratings",
          let: { videoContentId: "$_id", userId: new Types.ObjectId(userId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$videoContentId", "$$videoContentId"] },
                    { $eq: ["$userId", "$$userId"] },
                  ],
                },
              },
            },
            { $limit: 1 },
          ],
          as: "userRating",
        },
      },
      {
        $addFields: {
          ratedByMe: { $gt: [{ $size: "$userRating" }, 0] },
        },
      },
      {
        $project: {
          ratings: 0,
          userRating: 0,
        },
      },
      {
        $addFields: {
          genres: {
            $sortArray: { input: "$genres", sortBy: { name: 1 } },
          },
        },
      },
    ]);

    const enrichedVideoContent = enrichedVideoContents[0];

    enrichedVideoContent.views = videoContent.views;

    return enrichedVideoContent;
  }

  async updateVideoContentById(
    videoContentId: string,
    videoContentData: VideoContent
  ): Promise<VideoContent> {
    const convertedVideoContentData = convertBodyVideoContent(videoContentData);

    const {
      title,
      originTitle,
      typeVideoContent,
      IMDb,
      description,
      releaseDate,
      duration,
      previewURL,
      backgroundURL,
      trailerURL,
      originCountries,
      genres,
      actors,
      directors,
      lists,
      part,
      soundTracks,
      seasons,
    } = convertedVideoContentData;

    const videoContent = await VideoContentModel.findById(videoContentId);

    if (!videoContent) {
      throw new NotFoundError("VideoContent not found");
    }

    videoContent.title = title || videoContent.title;
    videoContent.originTitle = originTitle || videoContent.originTitle;
    videoContent.typeVideoContent =
      typeVideoContent || videoContent.typeVideoContent;
    videoContent.IMDb = IMDb || videoContent.IMDb;
    videoContent.description = description || videoContent.description;
    videoContent.releaseDate = releaseDate || videoContent.releaseDate;
    videoContent.duration = duration || videoContent.duration;
    videoContent.previewURL = previewURL || videoContent.previewURL;
    videoContent.backgroundURL = backgroundURL || videoContent.backgroundURL;
    videoContent.trailerURL = trailerURL || videoContent.trailerURL;
    videoContent.originCountries =
      originCountries || videoContent.originCountries;
    videoContent.genres = genres || videoContent.genres;
    videoContent.actors = actors || videoContent.actors;
    videoContent.directors = directors || videoContent.directors;
    videoContent.lists = lists || videoContent.lists;
    videoContent.part = part || videoContent.part;
    videoContent.soundTracks = soundTracks || videoContent.soundTracks;
    videoContent.seasons = seasons || videoContent.seasons;

    return await videoContent.save();
  }

  async deleteVideoContentById(videoContentId: string): Promise<void> {
    const videoContent = await VideoContentModel.findById(videoContentId);

    if (!videoContent) {
      throw new NotFoundError("VideoContent not found");
    }

    await videoContent.deleteOne();
  }

  async getVideoContents(query: any): Promise<{
    videoContent: VideoContent[];
    totalCount: number;
  }> {
    const {
      title,
      typeVideoContent,
      releaseYears,
      ratingRange,
      genre,
      bestList,
      genres,
      actor,
      actors,
      director,
      directors,
      lists,
      sort,
      fields,
      limit,
      page,
      selection,
    } = query;

    const queryObj: Query = {};

    if (selection) {
      const selectionDoc = await SelectionModel.findById(selection);
      if (selectionDoc) {
        queryObj._id = { $in: selectionDoc.videoContents };
      } else {
        return { videoContent: [], totalCount: 0 };
      }
    }

    if (title) {
      const regex = new RegExp(title, "i");
      if (!queryObj.$or) {
        queryObj.$or = [];
      }
      queryObj.$or = queryObj.$or.concat([
        { title: { $regex: regex } },
        { originTitle: { $regex: regex } },
      ]);
    }

    if (typeVideoContent) {
      if (Types.ObjectId.isValid(typeVideoContent)) {
        queryObj.typeVideoContent = new Types.ObjectId(typeVideoContent);
      } else {
        const typeContentDoc = await TypeContentModel.findOne({
          path: typeVideoContent,
        });
        if (typeContentDoc) {
          queryObj.typeVideoContent = typeContentDoc._id;
        }
      }
    }

    if (releaseYears) {
      const years = releaseYears
        .split(",")
        .map((year: string) => parseInt(year.trim()));
      const yearRanges = years.map((year: number) => ({
        releaseDate: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31),
        },
      }));

      if (!queryObj.$or) {
        queryObj.$or = [];
      }
      queryObj.$or = queryObj.$or.concat(yearRanges);
    }

    if (ratingRange) {
      const [minRating, maxRating] = ratingRange
        .split(",")
        .map((rating: string) => parseFloat(rating.trim()));
      queryObj.rating = { $gte: minRating, $lte: maxRating };
    }

    if (genre) {
      const genreDoc = await GenreModel.findOne({
        originName: { $regex: new RegExp(genre, "i") },
      });
      if (genreDoc) {
        queryObj.genres = { $all: [genreDoc._id] };
      }
    }

    if (bestList) {
      const bestListDoc = await ListModel.findOne({
        name: { $regex: new RegExp(bestList, "i") },
      });
      if (bestListDoc) {
        queryObj.lists = {
          $elemMatch: {
            idList: bestListDoc._id,
          },
        };
      }
    }

    if (genres) {
      const genresQuery: Types.ObjectId[] = genres
        .split(",")
        .map((genre: string) => new Types.ObjectId(genre));
      queryObj.genres = { $all: genresQuery };
    }

    if (actor) {
      const splitFullName = actor.split("-");
      if (Boolean(splitFullName.length) && splitFullName.length > 1) {
        const actorDoc = await ActorModel.findOne({
          firstNameEng: { $regex: new RegExp(`^${splitFullName[0]}$`, "i") },
          lastNameEng: {
            $regex: new RegExp(
              `^${
                splitFullName.length < 3
                  ? splitFullName[1]
                  : `${splitFullName[1]}-${splitFullName[2]}`
              }$`,
              "i"
            ),
          },
        });
        if (actorDoc) {
          queryObj.actors = { $all: [actorDoc._id] };
        }
      }
    }

    if (actors) {
      const actorsQuery: string[] = actors.split(",");
      queryObj.actors = { $all: actorsQuery };
    }

    if (director) {
      const splitFullName = director.split("-");
      if (Boolean(splitFullName.length) && splitFullName.length > 1) {
        const directorDoc = await DirectorModel.findOne({
          firstNameEng: { $regex: new RegExp(`^${splitFullName[0]}$`, "i") },
          lastNameEng: {
            $regex: new RegExp(
              `^${
                splitFullName.length < 3
                  ? splitFullName[1]
                  : `${splitFullName[1]}-${splitFullName[2]}`
              }$`,
              "i"
            ),
          },
        });
        if (directorDoc) {
          queryObj.directors = { $all: [directorDoc._id] };
        }
      }
    }

    if (directors) {
      const directorsQuery: string[] = directors.split(",");
      queryObj.directors = { $all: directorsQuery };
    }

    if (lists) {
      const listsQuery: string[] = lists.split(",");
      queryObj.lists = { $all: listsQuery };
    }

    const videoContentPerPage = parseInt(limit) || 20;
    const currentPage = page || 1;
    const skip = (currentPage - 1) * videoContentPerPage;

    const sortObj: any = {};

    if (sort) {
      const sortField = sort.replace("-", "");
      const sortOrder = sort.endsWith("-") ? 1 : -1;

      if (sortField === "rating") {
        sortObj["averageRating"] = sortOrder;
      } else if (sortField === "views") {
        sortObj["views"] = sortOrder;
      } else if (sortField === "createdAt") {
        sortObj["createdAt"] = sortOrder;
      } else {
        const sortList = sort.split(",").join(" ");
        sortObj[sortList] = sortOrder;
      }
    } else {
      sortObj["createdAt"] = 1;
    }

    const aggregationPipeline: PipelineStage[] = [
      { $match: queryObj },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "videoContentId",
          as: "ratings",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$ratings.rate" },
          ratingCount: { $size: "$ratings" },
        },
      },
      {
        $lookup: {
          from: "typecontents",
          localField: "typeVideoContent",
          foreignField: "_id",
          as: "typeVideoContent",
        },
      },
      { $unwind: "$typeVideoContent" },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      { $sort: sortObj },
      { $skip: skip },
      { $limit: videoContentPerPage },
    ];

    if (fields) {
      const fieldList = fields.split(",");
      const projectFields = fieldList.reduce((acc: any, field: any) => {
        acc[field] = 1;
        return acc;
      }, {});
      aggregationPipeline.push({ $project: projectFields });
    } else {
      aggregationPipeline.push({
        $project: {
          title: 1,
          originTitle: 1,
          previewURL: 1,
          backgroundURL: 1,
          trailerURL: 1,
          IMDb: 1,
          description: 1,
          duration: 1,
          releaseDate: 1,
          averageRating: 1,
          ratingCount: 1,
          typeVideoContent: 1,
          genres: 1,
          createdAt: 1,
        },
      });
    }

    const [videoContent, totalCount] = await Promise.all([
      VideoContentModel.aggregate(aggregationPipeline).exec(),
      VideoContentModel.countDocuments(queryObj),
    ]);

    return { videoContent, totalCount };
  }
}

export default new VideoContentRepository();
