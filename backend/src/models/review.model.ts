import mongoose, { Schema, Document, Types } from "mongoose";

export interface Review extends Document {
  userId: Types.ObjectId;
  contentId: Types.ObjectId;
  responseId: Types.ObjectId;
  message: string;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  edited: boolean;
  responses: Types.ObjectId[];
}

export interface ReviewWithLikeDislikeCounts extends Document {
  userId: Types.ObjectId;
  contentId: Types.ObjectId;
  responseId: Types.ObjectId;
  message: string;
  likes: number;
  dislikes: number;
  edited: boolean;
  responses: Types.ObjectId[];
}

const ReviewSchema: Schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide userId"],
    },
    contentId: {
      type: Types.ObjectId,
      ref: "Content",
      required: [true, "Please provide contentId"],
    },
    responseId: {
      type: Types.ObjectId,
      ref: "Review",
    },
    message: {
      type: String,
      required: [true, "Please provide message"],
      minLength: [10, "Message should be at least 10 characters long"],
    },
    likes: [
      {
        type: Types.ObjectId,
      },
    ],
    dislikes: [
      {
        type: Types.ObjectId,
      },
    ],
    edited: {
      type: Boolean,
      default: false,
    },
    responses: [
      {
        type: Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Review>("Review", ReviewSchema);
