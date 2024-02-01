import mongoose, { Schema, Document } from 'mongoose';

export interface Director extends Document {
    firstName: string;
    lastName: string;
    originalFullName: string;
    photoURL: string;
    dateBirth?: Date;
    dateDeath?: Date;
    sex: 'Man' | 'Woman';
    placeBirth: string;
    age: string | number;
}

const DirectorSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide firstName'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide lastName'],
    },
    originalFullName: {
        type: String,
        required: [true, 'Please provide originalFullName'],
    },
    photoURL: {
        type: String,
        required: [true, 'Please provide photoURL'],
    },
    dateBirth: {
        type: Date,
    },
    dateDeath: {
        type: Date,
    },
    sex: {
        type: String,
        enum: ['Man', 'Woman'], 
        required: true,
    },
    placeBirth: {
        type: String,
        required: [true, 'Please provide placeBirth'],
    }
});

DirectorSchema.virtual('age').get(function(this: Director) {
    const currentDate = new Date();
    const birthDate = this.dateBirth;

    if (birthDate) {
        if (this.dateDeath) {
            const deathDate = this.dateDeath;
            return deathDate.getFullYear() - birthDate.getFullYear();
        }
        
        const years = currentDate.getFullYear() - birthDate.getFullYear();
        const months = currentDate.getMonth() - birthDate.getMonth();
        if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
            return years - 1;
        }
        return years;
    }

    return "";
});

export default mongoose.model<Director>('Director', DirectorSchema);
