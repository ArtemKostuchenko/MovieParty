import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import GenreRepository from '../repositories/genre.repository';

const createGenre = async (req: Request, res: Response): Promise<Response> => {
    const genre = await GenreRepository.createGenre(req.body);

    return res.status(StatusCodes.CREATED).json({ data: genre });
}

const getGenre = async (req: Request, res: Response): Promise<Response> => {
    const { id: idGenre } = req.params;

    const genre = await GenreRepository.getGenreById(idGenre);

    return res.status(StatusCodes.OK).json({ data: genre });
}

const updateGenre = async (req: Request, res: Response): Promise<Response> => {
    const { id: idGenre } = req.params;

    const updatedGenre = await GenreRepository.updateGenreById(idGenre, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedGenre });
}

const deleteGenre = async (req: Request, res: Response): Promise<Response> => {
    const { id: idGenre } = req.params;

    await GenreRepository.deleteGenreById(idGenre);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getGenres = async (req: Request, res: Response): Promise<Response> => {
    const genres = await GenreRepository.getGenres(req.body);

    return res.status(StatusCodes.OK).json({ data: genres });
}

export {
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre,
    getGenres,
};
