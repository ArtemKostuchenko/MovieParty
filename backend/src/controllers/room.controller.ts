import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RoomRepository from '../repositories/room.repository';
import { Room } from '../models/room.model';

const createRoom = async (req: Request, res: Response): Promise<Response> => {
    const room: Room = await RoomRepository.createRoom(req.body);

    return res.status(StatusCodes.CREATED).json({ data: room });
}

const getRoom = async (req: Request, res: Response): Promise<Response> => {
    const { id: roomId } = req.params;

    const room: Room = await RoomRepository.getRoom(roomId);

    return res.status(StatusCodes.OK).json({ data: room });
}

export {
    createRoom,
    getRoom,
}