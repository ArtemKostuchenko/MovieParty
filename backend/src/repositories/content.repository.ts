import { validateVideoContent } from "../utils/validations";
import { NotFoundError } from "../errors";
import VideoContentModel, { VideoContent } from "../models/content.model";
import mongoose from "mongoose";

interface Query {
  title?: { $regex: string; $options: string };
  originTitle?: { $regex: string; $options: string };
  $or?: object[];
  rating?: { $gte: number; $lte: number };
  genres?: { $all: string[] };
  actors?: { $all: string[] };
  directors?: { $all: string[] };
  lists?: { $all: string[] };
  [key: string]: any;
}

class VideoContentRepository {
  constructor() {}

  async createVideoContent(
    videoContentData: VideoContent
  ): Promise<VideoContent> {
    const validVideoContentData = validateVideoContent(videoContentData);
    console.log(validVideoContentData);

    return await VideoContentModel.create(validVideoContentData);
  }

  async getVideoContentById(videoContentId: string): Promise<VideoContent> {
    const videoContents = await VideoContentModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(videoContentId) } },
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
      {
        $unwind: "$part",
      },
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
    ]);

    const videoContent = videoContents[0];

    if (!videoContent) {
      throw new NotFoundError("VideoContent not found");
    }

    return videoContent;
  }

  async getVideoContentByOriginTitle(
    originTitle: string
  ): Promise<VideoContent> {
    const videoContents = await VideoContentModel.aggregate([
      { $match: { originTitle: { $regex: originTitle, $options: "i" } } },
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
      {
        $unwind: "$part",
      },
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
        $sort: {
          "part.contents.releaseDate": 1,
        },
      },
    ]);

    const videoContent = videoContents[0];

    if (!videoContent) {
      throw new NotFoundError("VideoContent not found");
    }

    return videoContent;
  }

  async updateVideoContentById(
    videoContentId: string,
    videoContentData: VideoContent
  ): Promise<VideoContent> {
    const validVideoContentData = validateVideoContent(videoContentData);

    const {
      title,
      originTitle,
      typeVideoContent,
      IMDb,
      description,
      rating,
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
    } = validVideoContentData;

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
    videoContent.rating = rating || videoContent.rating;
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
      releaseYears,
      ratingRange,
      genres,
      actors,
      directors,
      lists,
      sort,
      fields,
    } = query;

    const queryObj: Query = {};

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

    if (genres) {
      const genresQuery: string[] = genres.split(",");
      queryObj.genres = { $all: genresQuery };
    }

    if (actors) {
      const actorsQuery: string[] = actors.split(",");
      queryObj.actors = { $all: actorsQuery };
    }

    if (directors) {
      const directorsQuery: string[] = directors.split(",");
      queryObj.directors = { $all: directorsQuery };
    }

    if (lists) {
      const listsQuery: string[] = lists.split(",");
      queryObj.lists = { $all: listsQuery };
    }

    let videoContents = VideoContentModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      videoContents = videoContents.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      videoContents = videoContents.select(fieldList);
    }

    const videoContentPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * videoContentPerPage;

    const [videoContent, totalCount] = await Promise.all([
      videoContents.skip(skip).limit(videoContentPerPage),
      VideoContentModel.countDocuments(queryObj),
    ]);

    return { videoContent, totalCount };
  }
}

export default new VideoContentRepository();
