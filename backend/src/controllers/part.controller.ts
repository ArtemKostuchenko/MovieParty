import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PartRepository from '../repositories/part.repository';

const createPart = async (req: Request, res: Response): Promise<Response> => {
    const part = await PartRepository.createPart(req.body);

    return res.status(StatusCodes.CREATED).json({ data: part });
}

const getPart = async (req: Request, res: Response): Promise<Response> => {
    const { id: idPart } = req.params;

    const part = await PartRepository.getPartById(idPart);

    return res.status(StatusCodes.OK).json({ data: part });
}

const updatePart = async (req: Request, res: Response): Promise<Response> => {
    const { id: idPart } = req.params;

    const updatedPart = await PartRepository.updatePartById(idPart, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedPart });
}

const deletePart = async (req: Request, res: Response): Promise<Response> => {
    const { id: idPart } = req.params;

    await PartRepository.deletePartById(idPart);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getParts = async (req: Request, res: Response): Promise<Response> => {
    const parts = await PartRepository.getParts(req.query);

    return res.status(StatusCodes.OK).json({ data: parts });
}

export {
    createPart,
    getPart,
    updatePart,
    deletePart,
    getParts,
};
