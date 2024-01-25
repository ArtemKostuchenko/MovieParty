const GenreModel = require('../models/genre.model');
const { BadRequestError, NotFoundError } = require('../errors');


class GenreRepository {
    constructor() { }

    async createGenre(genreData) {
        const { name } = genreData;

        if (!name) {
            throw new BadRequestError('Please provide genre name');
        }

        return await GenreModel.create(genreData);
    }

    async getGenreById(idGenre) {
        const genre = await GenreModel.findById(idGenre);

        if (!genre) {
            throw new NotFoundError("Genre not found");
        }

        return genre;
    }

    async updateGenreById(idGenre, genreData) {
        const { name } = genreData;

        if (!name) {
            throw new BadRequestError('Please provide genre name');
        }

        const genre = await GenreModel.findById(idGenre);

        if (!genre) {
            throw new NotFoundError("Genre not found");
        }

        genre.name = name || genre.name;

        return await genre.save();
    }

    async deleteGenreById(idGenre) {
        const genre = await GenreModel.findById(idGenre);

        if (!genre) {
            throw new NotFoundError("Genre not found");
        }

        await genre.deleteOne();
    }

    async getGenres() {
        return await GenreModel.find({});
    }
}

module.exports = new GenreRepository();