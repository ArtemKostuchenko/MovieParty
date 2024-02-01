import mongoose, { Schema, Document } from 'mongoose';

export interface Part extends Document {
    name: string;
}

const PartSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide part name'],
    }
});

export default mongoose.model<Part>('Part', PartSchema);
