import mongoose, { Schema, Document } from 'mongoose';

interface Token extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    createdAt: Date;
}

const TokenSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

export default mongoose.model<Token>('Token', TokenSchema);
