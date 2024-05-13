import mongoose, { Schema, Document } from 'mongoose';

export interface Country extends Document {
  name: string;
  originName: string;
  icon: string;
}

const CountrySchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  originName: {
    type: String,
    required: [true, "Please provide original name"],
  },
  icon: {
    type: String,
    required: [true, "Please provide icon"],
  },
}, {
  timestamps: true,
});

export default mongoose.model<Country>('Country', CountrySchema);
