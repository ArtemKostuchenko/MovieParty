import mongoose, { Schema, Types, Document } from 'mongoose';

export interface Message extends Document{
    roomId: Types.ObjectId;
    userId: Types.ObjectId;
    message: string;
    deleted: boolean;
}

const MessageSchema: Schema = new Schema({
    roomId:{
        type: Types.ObjectId,
        required: [true, 'Please provide roomId'],
        ref: 'Room',
    },
    userId:{
        type: Types.ObjectId,
        required: [true, 'Please provide userId'],
        ref: 'User',
    },
    message: {
        type: String,
        require: [true, 'Please provide message'],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model<Message>('Message', MessageSchema);