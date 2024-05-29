import mongoose, { Schema, Types, Document } from "mongoose";

export interface Rating extends Document {
  videoContentId: Types.ObjectId;
  userId: Types.ObjectId;
  rate: number;
}

const RatingSchema: Schema = new Schema(
  {
    videoContentId: {
      type: Types.ObjectId,
      ref: "VideoContent",
      required: [true, "Please provide videoContentId"],
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide userId"],
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "Please provide rate"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<Rating>("Rating", RatingSchema);
