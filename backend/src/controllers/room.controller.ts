import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import RoomRepository from "../repositories/room.repository";
import { Room } from "../models/room.model";
import MessageRepository from "../repositories/message.repository";
import { Types } from "mongoose";

const createRoom = async (req: Request, res: Response): Promise<Response> => {
  req.body.ownerId = req.user?.id;

  const room: Room = await RoomRepository.createRoom(req.body, req.user?.id);

  return res.status(StatusCodes.CREATED).json({ data: room });
};

const getRoom = async (req: Request, res: Response): Promise<Response> => {
  const { id: roomId } = req.params;

  const room: Room = await RoomRepository.getRoomById(roomId, req.user?._id);

  return res.status(StatusCodes.OK).json({ data: room });
};

const updateRoomById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: roomId } = req.params;

  const updatedRoom = await RoomRepository.updateRoomById(
    roomId,
    req.user?.id,
    req.body
  );

  return res.status(StatusCodes.OK).json({ data: updatedRoom });
};

const deleteRoom = async (req: Request, res: Response): Promise<Response> => {
  const { id: roomId } = req.params;

  await RoomRepository.deleteRoomById(roomId, req.user?._id);

  return res.status(StatusCodes.OK).json({ success: true });
};

const getRoomByInviteCode = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const code: string = req.query.code as string;

  const room: Room = await RoomRepository.getRoomByInviteCode(code);

  return res.status(StatusCodes.OK).json({ data: room });
};

const inviteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id: roomId } = req.params;

  const room: Room = await RoomRepository.inviteUser(
    roomId,
    req.user?._id,
    req.body.password
  );

  return res.status(StatusCodes.OK).json({ data: room });
};

const getRoomMessages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: roomId } = req.params;

  const messages = await MessageRepository.getLastMessagesByRoomId(roomId);

  return res.status(StatusCodes.OK).json({ data: messages });
};

export {
  createRoom,
  getRoom,
  updateRoomById,
  deleteRoom,
  getRoomByInviteCode,
  inviteUser,
  getRoomMessages,
};
