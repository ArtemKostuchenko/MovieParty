const mongoose = require('mongoose');

const DirectorSchema = mongoose.Schema({
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

DirectorSchema.virtual('age').get(function() {
    const currentDate = new Date();
    const birthDate = this.dateBirth;

    if(this.dateBirth){
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

module.exports = mongoose.model('Director', DirectorSchema);