import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors";
import RoomModel, { Room } from "../models/room.model";
import { validateRoom } from "../utils/validations";
import { Types } from "mongoose";
import ContentRepository from "./content.repository";
import UserModel from "../models/user.model";

class RoomRepository {
  constructor() {}

  async createRoom(roomData: Room, userId: string): Promise<Room> {
    validateRoom(roomData);

    if (
      roomData.isPublic !== undefined &&
      !roomData.isPublic &&
      !roomData.password
    ) {
      throw new BadRequestError("Please provide password for private room");
    }

    const room = await RoomModel.create(roomData);

    if (room) {
      const user = await UserModel.findById(userId);
      if (user) {
        user.roomId = room._id;
        user.numberCreatedRooms = +1;
        await user.save();
      }
    }

    return room;
  }

  async getRoomById(roomId: string, userId: string): Promise<Room> {
    const room = await RoomModel.aggregate([
      { $match: { _id: new Types.ObjectId(roomId) } },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "ownerUser",
        },
      },
      { $unwind: "$ownerUser" },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "videocontents",
          localField: "videoContentId",
          foreignField: "_id",
          as: "videoContent",
        },
      },
      { $unwind: "$videoContent" },
      {
        $lookup: {
          from: "typecontents",
          localField: "videoContent.typeVideoContent",
          foreignField: "_id",
          as: "videoContent.typeVideoContent",
        },
      },
      { $unwind: "$videoContent.typeVideoContent" },
      {
        $lookup: {
          from: "countries",
          localField: "videoContent.originCountries",
          foreignField: "_id",
          as: "videoContent.originCountries",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "videoContent.genres",
          foreignField: "_id",
          as: "videoContent.genres",
        },
      },
      {
        $lookup: {
          from: "lists",
          localField: "videoContent.lists.idList",
          foreignField: "_id",
          as: "videoContent.lists",
        },
      },
      {
        $addFields: {
          "videoContent.lists": {
            $map: {
              input: "$videoContent.lists",
              as: "list",
              in: {
                list: {
                  _id: "$$list._id",
                  name: "$$list.name",
                },
                placeInList: {
                  $arrayElemAt: [
                    "$videoContent.lists.placeInList",
                    {
                      $indexOfArray: [
                        "$videoContent.lists.idList",
                        "$$list._id",
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "videoContent._id",
          foreignField: "videoContentId",
          as: "videoContent.ratings",
        },
      },
      {
        $addFields: {
          "videoContent.rating": {
            averageRating: { $avg: "$videoContent.ratings.rate" },
            voteCount: { $size: "$videoContent.ratings" },
          },
        },
      },
      {
        $lookup: {
          from: "ratings",
          let: {
            videoContentId: "$videoContent._id",
            userId: new Types.ObjectId(userId),
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$videoContentId", "$$videoContentId"] },
                    { $eq: ["$userId", "$$userId"] },
                  ],
                },
              },
            },
            { $limit: 1 },
          ],
          as: "videoContent.userRating",
        },
      },
      {
        $addFields: {
          "videoContent.ratedByMe": {
            $gt: [{ $size: "$videoContent.userRating" }, 0],
          },
        },
      },
      {
        $project: {
          "ownerUser.password": 0,
          "ownerUser.isAdmin": 0,
          "ownerUser.likes": 0,
          "ownerUser.dislikes": 0,
          "ownerUser.country": 0,
          "ownerUser.createdAt": 0,
          "ownerUser.email": 0,
          "ownerUser.favorites": 0,
          "ownerUser.googleId": 0,
          "ownerUser.updatedAt": 0,
          "ownerUser.__v": 0,
          "videoContent.ratings": 0,
          "videoContent.userRating": 0,
          videoContentId: 0,
          "users.password": 0,
          "users.isAdmin": 0,
          "users.likes": 0,
          "users.dislikes": 0,
          "users.country": 0,
          "users.createdAt": 0,
          "users.email": 0,
          "users.favorites": 0,
          "users.googleId": 0,
          "users.updatedAt": 0,
          "users.__v": 0,
        },
      },
      {
        $addFields: {
          users: { $ifNull: ["$users", []] },
        },
      },
      {
        $addFields: {
          "videoContent.genres": {
            $sortArray: { input: "$videoContent.genres", sortBy: { name: 1 } },
          },
        },
      },
    ]);

    if (!room || room.length === 0) {
      throw new NotFoundError("Room not found");
    }

    const foundRoom = room[0];

    if (!foundRoom.invitedUsers.find((user: any) => user.equals(userId))) {
      if (foundRoom.ownerId.equals(userId)) {
        return foundRoom;
      }

      throw new NotFoundError("Room not found");
    }

    if (
      foundRoom.users.length >= foundRoom.maxNumberUsers &&
      !foundRoom.users.find((user: any) => user._id.equals(userId))
    ) {
      throw new NotFoundError("Room not found");
    }

    return foundRoom;
  }

  async getRoomByInviteCode(inviteCode: string | undefined): Promise<Room> {
    if (!inviteCode) {
      throw new BadRequestError("Please provide invite code");
    }

    const room = await RoomModel.findOne({ inviteCode })
      .select("title isPublic maxNumberUsers users")
      .populate("users", "nickname avatarURL avatarColor");

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    return room;
  }

  async updateRoomById(
    roomId: string,
    userId: string,
    roomData: Room
  ): Promise<Room> {
    const {
      title,
      videoContentId,
      isPublic,
      password,
      maxNumberUsers,
      voiceChat,
    } = roomData;

    const room = await RoomModel.findOne({
      _id: roomId,
      ownerId: new Types.ObjectId(userId),
    });

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    room.title = title || room.title;
    room.videoContentId = videoContentId || room.videoContentId;
    room.isPublic = isPublic || room.isPublic;
    room.password = password || room.password;
    room.maxNumberUsers = maxNumberUsers || room.maxNumberUsers;
    room.voiceChat = voiceChat || room.voiceChat;

    return await room.save();
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

      const user = await UserModel.findById(userId);

      if (user) {
        user.numberVisitedRooms = +1;
        await user.save();
      }
    }

    await room.save();

    return room._id;
  }

  async connectUser(roomId: string, userId: string): Promise<void> {
    const room = await RoomModel.findById(roomId);

    if (room) {
      const connectedUser = room.users.find((uId) => uId.equals(userId));

      if (!connectedUser) {
        room.users.push(new Types.ObjectId(userId));
      }

      await room.save();
    }
  }

  async disconnectUser(roomId: string, userId: string): Promise<void> {
    const room = await RoomModel.findById(roomId).select("users");

    if (room) {
      room.users = room.users.filter((uId) => !uId.equals(userId));

      await room.save();

      return room._id;
    }
  }

  async deleteRoomById(roomId: string, ownerId: string): Promise<void> {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    if (!room.ownerId.equals(ownerId)) {
      throw new UnAuthorizedError("Invalid credentials");
    }

    const user = await UserModel.findById(room.ownerId);

    if (user) {
      user.roomId = "";
      await user.save();
    }

    await room.deleteOne();
  }

  async existUserInRoom(
    roomId: string,
    userId: Types.ObjectId
  ): Promise<boolean> {
    const room = await RoomModel.findOne({
      _id: roomId,
    });

    if (!room) {
      return false;
    }

    if (room.ownerId.equals(userId)) return true;

    const existUser = room.invitedUsers.find((uId) => uId.equals(userId));

    if (!existUser) {
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
