import mongoose, { Schema, Document } from 'mongoose';

export interface Actor extends Document {
    firstName: string;
    lastName: string;
    firstNameEng: string;
    lastNameEng: string;
    photoURL: string;
    dateBirth?: Date;
    dateDeath?: Date;
    sex: 'Man' | 'Woman';
    placeBirth: string;
    age: number;
}

const ActorSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide firstName'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide lastName'],
    },
    firstNameEng: {
        type: String,
        required: [true, 'Please provide firstNameEng'],
    },
    lastNameEng: {
        type: String,
        required: [true, 'Please provide lastNameEng'],
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
}, {timestamps: true});

ActorSchema.virtual('age').get(function(this: Actor): number | string {
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

export default mongoose.model<Actor>('Actor', ActorSchema);
