import mongoose, { Schema, Document } from 'mongoose';

export interface List extends Document {
    name: string;
}

const ListSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide list name'],
    }
}, {timestamps: true});

export default mongoose.model<List>('List', ListSchema);
