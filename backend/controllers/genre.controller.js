const GenreRepository = require('../repositories/genre.repository');
const { StatusCodes } = require('http-status-codes')


const createGenre = async (req, res) => {
    const genre = await GenreRepository.createGenre(req.body);

    return res.status(StatusCodes.CREATED).json({ data: genre });
}

const getGenre = async (req, res) => {
    const { id: idGenre } = req.params;

    const genre = await GenreRepository.getGenreById(idGenre);

    return res.status(StatusCodes.OK).json({ data: genre });
}

const updateGenre = async (req, res) => {
    const { id: idGenre } = req.params;

    const updatedGenre = await GenreRepository.updateGenreById(idGenre, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedGenre });
}

const deleteGenre = async (req, res) => {
    const { id: idGenre } = req.params;

    await GenreRepository.deleteGenreById(idGenre);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getGenres = async (req, res) => {
    const genres = await GenreRepository.getGenres();

    return res.status(StatusCodes.OK).json({ data: genres });
}

module.exports = { createGenre, getGenre, updateGenre, deleteGenre, getGenres };