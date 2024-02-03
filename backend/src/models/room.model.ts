import mongoose, { Schema, Types, Document } from 'mongoose';


export interface Room extends Document {
    ownerId: Types.ObjectId;
    videoContentId: Types.ObjectId;
    title: string;
    description: string;
    public: boolean;
    password: string;
    voiceChat: boolean;
    users: Array<Types.ObjectId>;
    blockedUsers: Array<Types.ObjectId>;
    accessControl: Array<Types.ObjectId>;
}

const RoomSchema: Schema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        required: [true, 'Please provide ownerId'],
        ref: 'User',
    },
    videoContentId: {
        type: Types.ObjectId,
        required: [true, 'Please provide videoContentId'],
        ref: 'VideoContent',
    },
    title: {
        type: String,
        required: [true, 'Please provide title room'],
    },
    description: {
        type: String,
        required: [true, 'Please provide description room'],
    },
    public: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    voiceChat: {
        type: Boolean,
        default: false,
    },
    users: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    blockedUsers: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    accessControl: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
});

export default mongoose.model<Room>('Room', RoomSchema);