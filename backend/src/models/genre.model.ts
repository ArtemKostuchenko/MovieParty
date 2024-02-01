import mongoose, { Schema, Document } from 'mongoose';

export interface Genre extends Document {
    name: string;
}

const GenreSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide genre name'],
    }
});

export default mongoose.model<Genre>('Genre', GenreSchema);
