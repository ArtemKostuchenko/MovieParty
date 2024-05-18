import mongoose, { Schema, Document } from "mongoose";

export interface TypeContent extends Document {
  name: string;
  path: string;
  isSeries: boolean;
}

const TypeContentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    path: {
      type: String,
      required: [true, "Please provide path"],
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TypeContent>("TypeContent", TypeContentSchema);
