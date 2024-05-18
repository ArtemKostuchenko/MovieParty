import mongoose, { Schema, Document } from "mongoose";

export interface Genre extends Document {
  name: string;
  originName: string;
}

const GenreSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide genre name"],
    },
    originName: {
      type: String,
      required: [true, "Please provide genre originName"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Genre>("Genre", GenreSchema);
