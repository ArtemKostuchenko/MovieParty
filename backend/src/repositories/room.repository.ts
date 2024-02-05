import { NotFoundError } from "../errors";
import RoomModel, { Room } from "../models/room.model";
import { validateRoom } from "../utils/validations";


class RoomRepository {
    constructor() { }

    async createRoom(roomData: Room): Promise<Room> {
        validateRoom(roomData);

        const room = await RoomModel.create(roomData);

        return room;
    }

    async getRoom(roomId: string): Promise<Room> {
        const room = await RoomModel.findById(roomId);

        if(!room){
            throw new NotFoundError("Room not found");
        }

        return room;
    }
}

export default new RoomRepository();