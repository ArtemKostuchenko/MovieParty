import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ListRepository from '../repositories/list.repository';

const createList = async (req: Request, res: Response): Promise<Response> => {
    const list = await ListRepository.createList(req.body);

    return res.status(StatusCodes.CREATED).json({ data: list });
}

const getList = async (req: Request, res: Response): Promise<Response> => {
    const { id: idList } = req.params;

    const list = await ListRepository.getListById(idList);

    return res.status(StatusCodes.OK).json({ data: list });
}

const updateList = async (req: Request, res: Response): Promise<Response> => {
    const { id: idList } = req.params;

    const updatedList = await ListRepository.updateListById(idList, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedList });
}

const deleteList = async (req: Request, res: Response): Promise<Response> => {
    const { id: idList } = req.params;

    await ListRepository.deleteListById(idList);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getLists = async (req: Request, res: Response): Promise<Response> => {
    const lists = await ListRepository.getLists(req.query);

    return res.status(StatusCodes.OK).json({ data: lists });
}

export {
    createList,
    getList,
    updateList,
    deleteList,
    getLists,
};
