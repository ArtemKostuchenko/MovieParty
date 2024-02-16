import { NotFoundError } from "../errors";
import MessageModel, { Message } from "../models/message.model";
import { validateMessage } from "../utils/validations";

class MessageRepository {
    constructor() { }

    async addMessage(messageData: object): Promise<void> {
        validateMessage(messageData as Message);

        await MessageModel.create(messageData);
    }

    async getLastMessagesByRoomId(roomId: string): Promise<Message[]> {
        const currentDate = new Date();

        const messages = await MessageModel.find({ roomId: roomId, createdAt: { $lte: currentDate }  }).populate('userId', 'nickname avatarURL avatarColor email').sort({ createdAt: -1 }).limit(40);

        return messages.reverse();
    }
}

export default new MessageRepository();