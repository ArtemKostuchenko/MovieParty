import mongoose, { Schema, Types, Document } from "mongoose";
import shortid from "shortid";
import bcrypt from "bcryptjs";

export interface Room extends Document {
  ownerId: Types.ObjectId;
  videoContentId: Types.ObjectId;
  time: number;
  inviteCode: string;
  title: string;
  isPublic: boolean;
  maxNumberUsers: number;
  password: string;
  voiceChat: boolean;
  users: Array<Types.ObjectId>;
  invitedUsers: Array<Types.ObjectId>;
  blockedUsers: Array<Types.ObjectId>;
  accessControl: Array<Types.ObjectId>;
  comparePassword(credentialPassword: string): Promise<boolean>;
}

const RoomSchema: Schema = new Schema({
  ownerId: {
    type: Types.ObjectId,
    required: [true, "Please provide ownerId"],
    ref: "User",
  },
  videoContentId: {
    type: Types.ObjectId,
    required: [true, "Please provide videoContentId"],
    ref: "VideoContent",
  },
  time: {
    type: Number,
    default: 0,
  },
  inviteCode: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Please provide title room"],
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  maxNumberUsers: {
    type: Number,
    default: 2,
    max: 20,
  },
  password: {
    type: String,
  },
  voiceChat: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  invitedUsers: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  blockedUsers: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  accessControl: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
});

RoomSchema.pre<Room>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  if (this.isNew) {
    const generatedCode = shortid.generate();
    this.inviteCode = generatedCode;
  }
  next();
});

RoomSchema.methods.comparePassword = async function (
  credentialPassword: string
): Promise<boolean> {
  const compare = await bcrypt.compare(credentialPassword, this.password);
  return compare;
};

export default mongoose.model<Room>("Room", RoomSchema);
