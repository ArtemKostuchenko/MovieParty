import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ActorRepository from '../repositories/actor.repository';
import { Actor } from '../models/actor.model';

const createActor = async (req: Request, res: Response): Promise<Response> => {
    const actor: Actor = await ActorRepository.createActor(req.body);

    return res.status(StatusCodes.CREATED).json({ data: actor });
}

const getActor = async (req: Request, res: Response): Promise<Response> => {
    const { id: idActor } = req.params;

    const actor: Actor = await ActorRepository.getActorById(idActor);

    return res.status(StatusCodes.OK).json({ data: actor });
}

const updateActor = async (req: Request, res: Response): Promise<Response> => {
    const { id: idActor } = req.params;

    const updatedActor: Actor = await ActorRepository.updateActorById(idActor, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedActor });
}

const deleteActor = async (req: Request, res: Response): Promise<Response> => {
    const { id: idActor } = req.params;

    await ActorRepository.deleteActorById(idActor);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getActors = async (req: Request, res: Response): Promise<Response> => {
    const actors: Actor[] = await ActorRepository.getActors();
    
    return res.status(StatusCodes.OK).json({ data: actors });
}

export {
    createActor,
    getActor,
    updateActor,
    deleteActor,
    getActors,
};
