import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RoomRepository from '../repositories/room.repository';
import { Room } from '../models/room.model';
import MessageRepository from '../repositories/message.repository';

const createRoom = async (req: Request, res: Response): Promise<Response> => {
    const room: Room = await RoomRepository.createRoom(req.body);

    return res.status(StatusCodes.CREATED).json({ data: room });
}

const getRoom = async (req: Request, res: Response): Promise<Response> => {
    const { id: roomId } = req.params;

    const room: Room = await RoomRepository.getRoomById(roomId, req.body.user.userId);

    return res.status(StatusCodes.OK).json({ data: room });
}

const getRoomByInviteCode = async (req: Request, res: Response): Promise<Response> => {
    const code: string | undefined = req.query.code as string | undefined;
    const room: Room = await RoomRepository.getRoomByInviteCode(code);

    return res.status(StatusCodes.OK).json({ data: room });
}

const inviteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id: roomId } = req.params;

    const room: Room = await RoomRepository.inviteUser(roomId, req.body.user.userId, req.body.password);

    return res.status(StatusCodes.OK).json({ data: room });
}

const deleteRoom = async (req: Request, res: Response): Promise<Response> => {
    const { id: roomId } = req.params;

    await RoomRepository.deleteRoomById(roomId, req.body.user.userId);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getRoomMessages = async (req: Request, res: Response): Promise<Response> => {
    const { id: roomId } = req.params;

    const messages = await MessageRepository.getLastMessagesByRoomId(roomId);

    return res.status(StatusCodes.OK).json({ data: messages });
}

export {
    createRoom,
    getRoom,
    getRoomByInviteCode,
    inviteUser,
    deleteRoom,
    getRoomMessages,
}