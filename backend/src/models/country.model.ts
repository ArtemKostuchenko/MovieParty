import mongoose, { Schema, Document } from 'mongoose';

export interface Country extends Document {
    name: string;
    code: string;
}

const CountrySchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    code: {
        type: String,
        required: [true, 'Please provide code'],
    }
});

export default mongoose.model<Country>('Country', CountrySchema);
