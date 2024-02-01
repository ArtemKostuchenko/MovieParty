import GenreModel, { Genre } from '../models/genre.model';
import { BadRequestError, NotFoundError } from '../errors';

class GenreRepository {
    constructor() { }

    async createGenre(genreData: Genre): Promise<Genre> {
        const { name } = genreData;

        if (!name) {
            throw new BadRequestError('Please provide genre name');
        }

        return await GenreModel.create(genreData);
    }

    async getGenreById(genreId: string): Promise<Genre> {
        const genre = await GenreModel.findById(genreId);

        if (!genre) {
            throw new NotFoundError("Genre not found");
        }

        return genre;
    }

    async updateGenreById(genreId: string, genreData: Genre): Promise<Genre> {
        const { name } = genreData;

        if (!name) {
            throw new BadRequestError('Please provide genre name');
        }

        const genre = await GenreModel.findById(genreId);

        if (!genre) {
            throw new NotFoundError("Genre not found");
        }

        genre.name = name || genre.name;

        return await genre.save();
    }

    async deleteGenreById(genreId: string): Promise<void> {
        const genre = await GenreModel.findById(genreId);

        if (!genre) {
            throw new NotFoundError("Genre not found");
        }

        await genre.deleteOne();
    }

    async getGenres(): Promise<Genre[]> {
        return await GenreModel.find({});
    }
}

export default new GenreRepository();
