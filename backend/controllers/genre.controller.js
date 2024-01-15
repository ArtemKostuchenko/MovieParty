const GenreModel = require('../models/genre.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes')


const createGenre = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new BadRequestError('Please provide genre name');
    }

    const genre = await GenreModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: genre });
}

const getGenre = async (req, res) => {
    const { id: idGenre } = req.params;

    const genre = await GenreModel.findById(idGenre);

    if (!genre) {
        throw new NotFoundError("Genre not found");
    }

    return res.status(StatusCodes.OK).json({ data: genre });
}

const updateGenre = async (req, res) => {
    const { id: idGenre } = req.params;
    const { name } = req.body;

    if (!name) {
        throw new BadRequestError('Please provide genre name');
    }

    const genre = await GenreModel.findById(idGenre);

    if (!genre) {
        throw new NotFoundError("Genre not found");
    }

    await GenreModel.updateOne({ _id: idGenre }, { $set: { name } }, { new: true })

    const updatedGenre = await GenreModel.findById(idGenre);

    return res.status(StatusCodes.OK).json({ data: updatedGenre });
}

const deleteGenre = async (req, res) => {
    const { id: idGenre } = req.params;

    const genre = await GenreModel.findById(idGenre);

    if (!genre) {
        throw new NotFoundError("Genre not found");
    }

    await genre.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getGenres = async (req, res) => {
    const genres = await GenreModel.find({});

    return res.status(StatusCodes.OK).json({ data: genres });
}

module.exports = { createGenre, getGenre, updateGenre, deleteGenre, getGenres };