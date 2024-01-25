const MovieRepository = require('../repositories/movie.repository');
const { StatusCodes } = require('http-status-codes');

const createMovie = async (req, res) => {
    const movie = await MovieRepository.createMovie(req.body);

    return res.status(StatusCodes.CREATED).json({ data: movie });
}

const getFullMovie = async (req, res) => {
    const { id: idMovie } = req.params;

    const movie = await MovieRepository.getMovieById(idMovie);


    return res.status(StatusCodes.OK).json({ data: movie });
}

const updateMovie = async (req, res) => {
    const { id: idMovie } = req.params;

    const updatedMovie = await MovieRepository.updateMovieById(idMovie, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedMovie });
}

const deleteMovie = async (req, res) => {
    const { id: idMovie } = req.params;

    await MovieRepository.deleteMovieById(idMovie);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getMovies = async (req, res) => {
    const movies = await MovieRepository.getMovies();

    return res.status(StatusCodes.OK).json({ data: movies });
}

module.exports = {
    createMovie,
    getFullMovie,
    updateMovie,
    deleteMovie,
    getMovies
}