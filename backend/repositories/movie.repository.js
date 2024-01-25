const { validateMovie } = require('../utils/validations');
const { BadRequestError, NotFoundError } = require('../errors');
const ContentRepository = require('../repositories/content.repository');
const MovieModel = require('../models/movie.model');
const mongoose = require('mongoose');

class MovieRepository {
    constructor() { }

    async createMovie(movieData) {
        const validMovieData = validateMovie(movieData);

        if (!validMovieData) {
            throw new BadRequestError('Please provide soundTracks');
        }

        const content = await ContentRepository.createContent(movieData);

        movieData.contentId = content._id;

        return await MovieModel.create(movieData);
    }

    async getMovieById(idMovie) {
        const movies = await MovieModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(idMovie) } },
            {
                $lookup: {
                    from: 'contents',
                    localField: 'contentId',
                    foreignField: '_id',
                    as: 'content'
                }
            },
            {
                $unwind: "$content"
            },
            {
                $lookup: {
                    from: 'countries',
                    localField: 'content.originCountries',
                    foreignField: '_id',
                    as: 'content.originCountries'
                }
            },
            {
                $lookup: {
                    from: 'genres',
                    localField: 'content.genres',
                    foreignField: '_id',
                    as: 'content.genres'
                }
            },
            {
                $lookup: {
                    from: 'actors',
                    localField: 'content.actors',
                    foreignField: '_id',
                    as: 'content.actors'
                }
            },
            {
                $lookup: {
                    from: 'directors',
                    localField: 'content.directors',
                    foreignField: '_id',
                    as: 'content.directors'
                }
            },
            {
                $addFields: {
                    "content.originalLists": "$content.lists"
                }
            },
            {
                $lookup: {
                    from: "lists",
                    localField: "content.originalLists.idList",
                    foreignField: "_id",
                    as: "content.lists"
                }
            },
            {
                $addFields: {
                    "content.lists": {
                        $map: {
                            input: "$content.lists",
                            as: "list",
                            in: {
                                list: {
                                    _id: "$$list._id",
                                    name: "$$list.name"
                                },
                                placeInList: {
                                    $arrayElemAt: [
                                        "$content.originalLists.placeInList",
                                        { $indexOfArray: ["$content.originalLists.idList", "$$list._id"] }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            { $unset: "content.originalLists" },
            {
                $lookup: {
                    from: "parts",
                    localField: "content.part",
                    foreignField: "_id",
                    as: "content.part"
                }
            },
            {
                $unwind: "$content.part"
            },
            {
                $lookup: {
                    from: "contents",
                    localField: "content.part._id",
                    foreignField: "part",
                    as: "content.part.contents"
                }
            },
            {
                $addFields: {
                    "content.part.contents": {
                        $map: {
                            input: "$content.part.contents",
                            as: "content",
                            in: {
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
                    "content.part.contents.releaseDate": 1
                }
            }
        ]);

        const movie = movies[0];

        if (!movie) {
            throw new NotFoundError('Movie not found');
        }

        return movie;
    }

    async updateMovieById(idMovie, movieData) {
        const { soundTracks } = movieData;

        const movie = await MovieModel.findById(idMovie);

        if (!movie) {
            throw new NotFoundError("Movie not found");
        }

        await ContentRepository.updateContentById(movie.contentId, movieData);

        movie.soundTracks = soundTracks || movie.soundTracks;

        return await movie.save();
    }

    async deleteMovieById(idMovie) {
        const movie = await MovieModel.findById(idMovie);

        if (!movie) {
            throw new NotFoundError("Movie not found");
        }

        await ContentRepository.deleteContentById(movie.contentId);

        await movie.deleteOne();
    }

    async getMovies() {
        return await MovieModel.aggregate([
            {
                $lookup: {
                    from: 'contents',
                    localField: 'contentId',
                    foreignField: '_id',
                    as: 'content'
                }
            },
            { $unwind: "$content" },
            {
                $addFields: {
                    "title": "$content.title",
                    "IMDb": "$content.IMDb",
                    "rating": "$content.rating",
                    "rating": "$content.previewURL",
                }
            },
            { $project: { "content": 0, "soundTracks": 0 } }
        ])
    }
}

module.exports = new MovieRepository();