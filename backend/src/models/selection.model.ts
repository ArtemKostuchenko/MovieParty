import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Selection extends Document {
    name: string;
    description: string;
    contents: Types.ObjectId[];
}

const SelectionSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
    },
    contents: [{
        type: Types.ObjectId,
        ref: 'Content',
    }],
});

export default mongoose.model<Selection>('Selection', SelectionSchema);
