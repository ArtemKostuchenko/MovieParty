import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import DirectorRepository from '../repositories/director.repository';
import { DirectorWithAge } from '../utils/interfaces';
import { Director } from '../models/director.model';

const createDirector = async (req: Request, res: Response): Promise<Response> => {
    const director: DirectorWithAge = await DirectorRepository.createDirector(req.body);

    return res.status(StatusCodes.CREATED).json({ data: director });
}

const getDirector = async (req: Request, res: Response): Promise<Response> => {
    const { id: idDirector } = req.params;

    const director: DirectorWithAge = await DirectorRepository.getDirectorById(idDirector);

    return res.status(StatusCodes.OK).json({ data: director });
}

const updateDirector = async (req: Request, res: Response): Promise<Response> => {
    const { id: idDirector } = req.params;

    const updatedDirector: Director = await DirectorRepository.updateDirectorById(idDirector, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedDirector });
}

const deleteDirector = async (req: Request, res: Response): Promise<Response> => {
    const { id: idDirector } = req.params;

    await DirectorRepository.deleteDirectorById(idDirector);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getDirectors = async (req: Request, res: Response): Promise<Response> => {
    const directors: DirectorWithAge[] = await DirectorRepository.getDirectors();

    return res.status(StatusCodes.OK).json({ data: directors });
}

export {
    createDirector,
    getDirector,
    updateDirector,
    deleteDirector,
    getDirectors,
};
