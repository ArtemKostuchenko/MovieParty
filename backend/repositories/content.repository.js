const { validateVideoContent } = require('../utils/validations');
const { NotFoundError } = require('../errors');
const VideoContentModel = require('../models/content.model');
const mongoose = require('mongoose');


class VideoContentRepository {
    constructor() { }

    async createVideoContent(videoContentData) {
        validateVideoContent(videoContentData);

        return await VideoContentModel.create(videoContentData);
    }

    async getVideoContentById(idVideoContent) {
        const videoContents = await VideoContentModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(idVideoContent) } },
            {
                $lookup: {
                    from: 'countries',
                    localField: 'originCountries',
                    foreignField: '_id',
                    as: 'originCountries'
                }
            },
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genres'
                }
            },
            {
                $lookup: {
                    from: 'actors',
                    localField: 'actors',
                    foreignField: '_id',
                    as: 'actors'
                }
            },
            {
                $lookup: {
                    from: 'directors',
                    localField: 'directors',
                    foreignField: '_id',
                    as: 'directors'
                }
            },
            {
                $addFields: {
                    "originalLists": "$lists"
                }
            },
            {
                $lookup: {
                    from: "lists",
                    localField: "originalLists.idList",
                    foreignField: "_id",
                    as: "lists"
                }
            },
            {
                $addFields: {
                    "lists": {
                        $map: {
                            input: "$lists",
                            as: "list",
                            in: {
                                list: {
                                    _id: "$$list._id",
                                    name: "$$list.name"
                                },
                                placeInList: {
                                    $arrayElemAt: [
                                        "$originalLists.placeInList",
                                        { $indexOfArray: ["$originalLists.idList", "$$list._id"] }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            { $unset: "originalLists" },
            {
                $lookup: {
                    from: "parts",
                    localField: "part",
                    foreignField: "_id",
                    as: "part"
                }
            },
            {
                $unwind: "$part"
            },
            {
                $lookup: {
                    from: "videocontents",
                    localField: "part._id",
                    foreignField: "part",
                    as: "part.contents"
                }
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
                                releaseDate: "$$content.releaseDate"
                            }
                        }
                    }
                }
            },
            {
                $sort: {
                    "part.contents.releaseDate": 1
                }
            }
        ]);

        const videoContent = videoContents[0];

        if (!videoContent) {
            throw new NotFoundError('VideoContent not found');
        }

        return videoContent;
    }

    async updateVideoContentById(idVideoContent, videoContentData) {
        const { title, originTitle, typeVideoContent, IMDb, description, rating, releaseDate, duration, previewURL, backgroundURL, trailerURL, originCountries, genres, actors, directors, lists, part, soundTracks, seasons } = videoContentData;

        const videoContent = await VideoContentModel.findById(idVideoContent);

        if (!videoContent) {
            throw new NotFoundError('VideoContent not found');
        }

        videoContent.title = title || videoContent.title;
        videoContent.originTitle = originTitle || videoContent.originTitle;
        videoContent.typeVideoContent = typeVideoContent || videoContent.typeVideoContent;
        videoContent.IMDb = IMDb || videoContent.IMDb;
        videoContent.description = description || videoContent.description;
        videoContent.rating = rating || videoContent.rating;
        videoContent.releaseDate = releaseDate || videoContent.releaseDate;
        videoContent.duration = duration || videoContent.duration;
        videoContent.previewURL = previewURL || videoContent.previewURL;
        videoContent.backgroundURL = backgroundURL || videoContent.backgroundURL;
        videoContent.trailerURL = trailerURL || videoContent.trailerURL;
        videoContent.originCountries = originCountries || videoContent.originCountries;
        videoContent.genres = genres || videoContent.genres;
        videoContent.actors = actors || videoContent.actors;
        videoContent.directors = directors || videoContent.directors;
        videoContent.lists = lists || videoContent.lists;
        videoContent.part = part || videoContent.part;
        videoContent.soundTracks = soundTracks || videoContent.soundTracks;
        videoContent.seasons = seasons || videoContent.seasons;

        return await videoContent.save();
    }

    async deleteVideoContentById(idVideoContent) {
        const videoContent = await VideoContentModel.findById(idVideoContent);

        if (!videoContent) {
            throw new NotFoundError('VideoContent not found');
        }

        await videoContent.deleteOne();
    }

    async getVideoContents(query) {
        const { title, originTitle, releaseYears, ratingRange, genres, actor, director, list, sort, fields } = query;
        const queryObj = {};
        if (title) {
            queryObj.title = { $regex: title, $options: 'i', };
        }
        if (originTitle) {
            queryObj.originTitle = { $regex: originTitle, $options: 'i', };
        }

        if (releaseYears) {
            const years = releaseYears.split(',').map(year => parseInt(year.trim()));

            const yearRanges = years.map(year => ({
                releaseDate: {
                    $gte: new Date(year, 0, 1),
                    $lte: new Date(year, 11, 31)
                }
            }));

            queryObj.$or = yearRanges;
        }

        if (ratingRange) {
            const [minRating, maxRating] = ratingRange.split(',').map(rating => parseFloat(rating.trim()));
            queryObj.rating = { $gte: minRating, $lte: maxRating };
        }

        if (genres) {
            const genresQuery = genres.split(',');
            queryObj.genres = { $all: genresQuery  };
        }

        if (actor) {
            queryObj.actors = actor;
        }

        if (director) {
            queryObj.directors = director;
        }

        if (list) {
            queryObj.lists = list;
        }

        let videoContents = VideoContentModel.find(queryObj);

        if (sort) {
            const sortList = sort.split(',').join(' ');
            videoContents = videoContents.sort(sortList);
        }

        if (fields) {
            const fieldList = fields.split(',').join(' ')
            videoContents = videoContents.select(fieldList);
        }

        const page = query.page || 1;
        const limit = query.limit || 20;

        const skip = (page - 1) * limit;

        videoContents = videoContents.skip(skip).limit(limit);

        return await videoContents;
    }
}

module.exports = new VideoContentRepository();