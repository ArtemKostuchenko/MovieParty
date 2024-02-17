import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface User extends Document {
    googleId: string;
    isAdmin: boolean;
    nickname: string;
    email: string;
    password: string;
    avatarColor?: string;
    avatarURL?: string;
    sex?: 'Man' | 'Woman';
    country?: Types.ObjectId;
    likes: number;
    dislikes: number;
    favorites: Types.ObjectId[];
    createToken(): string;
    comparePassword(credentialPassword: string): Promise<boolean>;
}


const UserSchema: Schema<User> = new Schema({
    googleId: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    nickname: {
        type: String,
        required: [true, 'Please provide nickname'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
    },
    password: {
        type: String,
    },
    avatarColor: {
        type: String
    },
    avatarURL: {
        type: String,
    },
    sex: {
        type: String,
        enum: ['Man', 'Woman']
    },
    country: {
        type: Types.ObjectId,
        ref: 'Country'
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    favorites: [{ type: Types.ObjectId, ref: 'Content' }],
}, { timestamps: true });

UserSchema.pre<User>('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
});

UserSchema.methods.createToken = function(): string {
    return jwt.sign({ _id: this._id, nickname: this.nickname }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.TOKEN_LIFETIME,
    });
}


UserSchema.methods.comparePassword = async function (credentialPassword: string): Promise<boolean> {
    const compare = await bcrypt.compare(credentialPassword, this.password);
    return compare;
}

export default mongoose.model<User>('User', UserSchema);
