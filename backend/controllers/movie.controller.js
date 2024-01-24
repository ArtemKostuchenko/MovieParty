const MovieModel = require('../models/movie.model');
const ContentModel = require('../models/content.model');
const GenreModel = require('../models/genre.model');
const ActorModel = require('../models/actor.model');
const DirectorModel = require('../models/director.model');
const ListModel = require('../models/list.model');
const PartModel = require('../models/part.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { validateMovie } = require('../utils/validations');

const createMovie = async (req, res) => {
    if (!validateMovie(req)) {
        throw new BadRequestError('Please provide title, originTitle, IMDb, description, releaseDate, duration, previewURL, originCountries, genres, actors, directors and soundTracks')
    }

    req.body.lists = req.body.lists || []
    const lists = req.body.lists;

    req.body.lists = req.body.lists.map((list) => list.idList);

    const content = await ContentModel.create(req.body);

    await GenreModel.updateMany(
        { _id: { $in: req.body.genres } },
        { $push: { contents: content._id } }
    );

    await ActorModel.updateMany(
        { _id: { $in: req.body.actors } },
        { $push: { contents: content._id } }
    );

    await DirectorModel.updateMany(
        { _id: { $in: req.body.directors } },
        { $push: { contents: content._id } }
    );

    for (const list of lists) {
        await ListModel.updateOne(
            { _id: list.idList },
            { $push: { contents: { placeContent: list.placeInList, content: content._id } } }
        );
    }
    if (content.part) {
        await PartModel.updateOne(
            { _id: content.part },
            { $push: { contents: content._id } }
        );
    }

    req.body.idContent = content._id;

    const movie = await MovieModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: movie });
}

const getFullMovie = async (req, res) => {
    const { id: idMovie } = req.params;

    const movie = await MovieModel.findById(idMovie).populate({
        path: 'idContent',
        model: 'Content',
        populate: [
            {path: 'part', model: 'Part', populate: {path: 'contents', model: 'Content', select: 'title releaseDate IMDb', sort: 'releaseDate'}},
            {path: 'originCountries', model: 'Country'},
            {path: 'genres', model: 'Genre', select: '-contents'},
            {path: 'actors', model: 'Actor', select: '-contents'},
            {path: 'directors', model: 'Director', select: '-contents'},
            {path: 'lists', model: 'List'},
        ]
    });

    if (!movie) {
        throw new NotFoundError('Movie not found');
    }

    return res.status(StatusCodes.OK).json({ data: movie });
}

const updateMovie = async (req, res) => {
    const { title, originTitle, IMDb, description, rating, releaseDate, previewURL, backgroundURL, trailerURL, originCountries, genres, actors, directors, lists, part, soundTracks } = req.body;
    const { id: idMovie } = req.params;

    const movie = await MovieModel.findById(idMovie);

    if (!movie) {
        throw new NotFoundError('Movie not found');
    }

    const content = await ContentModel.findById(movie.idContent);

    if (!content) {
        throw new NotFoundError('Movie not found');
    }

    content.title = title || content.title;
    content.originTitle = originTitle || content.originTitle;
    content.IMDb = IMDb || content.IMDb;
    content.description = description || content.description;
    content.rating = rating || content.rating;
    content.releaseDate = releaseDate || content.releaseDate;
    content.previewURL = previewURL || content.previewURL;
    content.backgroundURL = backgroundURL || content.backgroundURL;
    content.trailerURL = trailerURL || content.trailerURL;

    if(part && content.part != part){
        await PartModel.updateOne(
            { _id: content.part },
            { $pull: { contents: content._id } }
        );
        await PartModel.updateOne(
            { _id: part },
            { $push: { contents: content._id } }
        );
        content.part = part;
    }

    if (originCountries && Array.isArray(originCountries)) {
        content.originCountries = originCountries;
    }

    if (genres && Array.isArray(genres)) {
        const genresToAdd = genres.filter(genre => !content.genres.includes(genre));
        const genresToRemove = content.genres.filter(genre => !genres.includes(genre));

        await GenreModel.updateMany(
            { _id: { $in: genresToAdd } },
            { $push: { contents: content._id } }
        );

        await GenreModel.updateMany(
            { _id: { $in: genresToRemove } },
            { $pull: { contents: content._id } }
        );
        content.genres = genres;
    }

    if (actors && Array.isArray(actors)) {
        const actorsToAdd = actors.filter(actor => !content.actors.includes(actor));
        const actorsToRemove = content.actors.filter(actor => !actors.includes(actor));

        await ActorModel.updateMany(
            { _id: { $in: actorsToAdd } },
            { $push: { contents: content._id } }
        );

        await ActorModel.updateMany(
            { _id: { $in: actorsToRemove } },
            { $pull: { contents: content._id } }
        );
        content.actors = actors;
    }

    if (directors && Array.isArray(directors)) {
        const directorsToAdd = directors.filter(director => !content.directors.includes(director));
        const directorsToRemove = content.directors.filter(director => !directors.includes(director));

        await DirectorModel.updateMany(
            { _id: { $in: directorsToAdd } },
            { $push: { contents: content._id } }
        );

        await DirectorModel.updateMany(
            { _id: { $in: directorsToRemove } },
            { $pull: { contents: content._id } }
        );

        content.directors = directors;
    }

    if (lists && Array.isArray(lists)) {
        const listIdsToRemove = content.lists.filter(existingList =>
            !lists.some(newList => existingList.equals(newList.idList))
        );
    
        const listIdsToAdd = lists.filter(list =>
            !content.lists.some(existingList => existingList.equals(list.idList))
        );
    
        await ListModel.updateMany(
            { _id: { $in: listIdsToRemove } },
            { $pull: { contents: { content: content._id } } }
        );
    
        await ListModel.updateMany(
            { _id: { $in: listIdsToAdd.map(list => list.idList) } },
            { $push: { contents: { $each: listIdsToAdd.map(list => ({ content: content._id, placeContent: list.placeInList })) } } }
        );
    
        content.lists = lists.map(list => list.idList);
    }

    if (soundTracks && Array.isArray(soundTracks)) {
        movie.soundTracks = soundTracks;
    }

    await movie.save();
    await content.save();

    const updatedMovie = await MovieModel.findById(idMovie);

    return res.status(StatusCodes.OK).json({ data: updatedMovie });
}

const deleteMovie = async (req, res) => {
    const { id: idMovie } = req.params;

    const movie = await MovieModel.findById(idMovie);

    if (!movie) {
        throw new NotFoundError('Movie not found');
    }

    const content = await ContentModel.findById(movie.idContent);

    if (!content) {
        throw new NotFoundError('Movie not found');
    }

    await movie.deleteOne();

    await PartModel.updateOne(
        { _id: content.part },
        { $pull: { contents: content._id } }
    );
    
    await GenreModel.updateMany(
        { _id: { $in: content.genres } },
        { $pull: { contents: content._id } }
    );

    await ActorModel.updateMany(
        { _id: { $in: content.actors } },
        { $pull: { contents: content._id } }
    );

    await DirectorModel.updateMany(
        { _id: { $in: content.directors } },
        { $pull: { contents: content._id } }
    );

    await ListModel.updateMany(
        { _id: { $in: content.lists } },
        { $pull: { contents: { content: content._id } } }
    );
    
    await content.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getMovies = async (req, res) => {
    const movies = await MovieModel.find({}).populate('idContent');

    return res.status(StatusCodes.OK).json({ data: movies });
}

module.exports = {
    createMovie,
    getFullMovie,
    updateMovie,
    deleteMovie,
    getMovies
}