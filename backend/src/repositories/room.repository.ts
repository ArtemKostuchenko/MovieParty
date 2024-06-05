import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors";
import RoomModel, { Room } from "../models/room.model";
import { validateRoom } from "../utils/validations";
import { Types } from "mongoose";
import ContentRepository from "./content.repository";

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

    return foundRoom;
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
