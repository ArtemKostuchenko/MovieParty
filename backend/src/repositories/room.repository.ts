import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors";
import RoomModel, { Room } from "../models/room.model";
import { validateRoom } from "../utils/validations";
import { Types } from "mongoose";

class RoomRepository {
  constructor() {}

  async createRoom(roomData: Room): Promise<Room> {
    validateRoom(roomData);

    if (
      roomData.isPublic !== undefined &&
      !roomData.isPublic &&
      !roomData.password
    ) {
      throw new BadRequestError("Please provide password for private room");
    }

    const room = await RoomModel.create(roomData);

    return room;
  }

  async getRoomById(roomId: string, userId: string): Promise<Room> {
    const room = await RoomModel.findOne({
      _id: roomId,
    }).populate("videoContentId");

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    if (!room.invitedUsers.find((user) => user.equals(userId))) {
      if (room.ownerId.equals(userId)) {
        return room;
      }

      throw new NotFoundError("Room not found");
    }

    return room;
  }

  async getRoomByInviteCode(inviteCode: string | undefined): Promise<Room> {
    if (!inviteCode) {
      throw new BadRequestError("Please provide invite code");
    }

    const room = await RoomModel.findOne({ inviteCode })
      .select("title public users")
      .populate("users", "email nickname avatarURL");

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    return room;
  }

  async inviteUser(
    roomId: string,
    userId: string,
    password: string
  ): Promise<Room> {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    if (!room.isPublic && !room.ownerId.equals(userId)) {
      if (!password) {
        throw new BadRequestError("Please provide password room");
      }

      const compare = await room.comparePassword(password);

      if (!compare) {
        throw new UnAuthorizedError("Invalid credentials");
      }
    }

    const invitedUser = room.invitedUsers.find((user) =>
      user._id.equals(userId)
    );

    if (!invitedUser) {
      room.invitedUsers.push(new Types.ObjectId(userId));
    }

    await room.save();

    return room._id;
  }

  async connectUser(roomId: string, userId: string): Promise<void> {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    const connectedUser = room.users.find((user) => user._id.equals(userId));

    if (!connectedUser) {
      room.users.push(new Types.ObjectId(userId));
    }

    await room.save();
  }

  async disconnectUser(roomId: string, userId: string): Promise<Room> {
    const room = await RoomModel.findById(roomId).select("users");

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    room.users = room.users.filter((user) => !user._id.equals(userId));

    await room.save();

    return room._id;
  }

  async deleteRoomById(roomId: string, ownerId: string): Promise<void> {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    if (!room.ownerId.equals(ownerId)) {
      throw new UnAuthorizedError("Invalid credentials");
    }

    await room.deleteOne();
  }

  async existUserInRoom(
    roomId: string,
    userId: Types.ObjectId
  ): Promise<boolean> {
    const room = await RoomModel.findOne({
      _id: roomId,
      invitedUsers: { $all: userId },
    });

    if (!room) {
      return false;
    }

    return true;
  }

  async updateTime(
    roomId: string,
    userId: Types.ObjectId,
    time: number
  ): Promise<void> {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    if (!room.ownerId.equals(userId)) {
      throw new UnAuthorizedError("Invalid credentials");
    }

    room.time = time;

    await room.save();
  }
}

export default new RoomRepository();
