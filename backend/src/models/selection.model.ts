import mongoose, { Schema, Document, Types } from "mongoose";

export interface Selection extends Document {
  name: string;
  previewURL: string;
  description: string;
  videoContents: Types.ObjectId[] | string;
}

const SelectionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    previewURL: {
      type: String,
      required: [true, "Please provide previewURL"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    videoContents: [
      {
        type: Types.ObjectId,
        ref: "VideoContent",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Selection>("Selection", SelectionSchema);
