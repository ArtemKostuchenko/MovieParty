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

    async getVideoContents(){
        return await VideoContentModel.aggregate([
            { $project: { "title": 1, "IMDb": 1, "rating": 1, "previewURL": 1 } }
        ])
    }
}

module.exports = new VideoContentRepository();