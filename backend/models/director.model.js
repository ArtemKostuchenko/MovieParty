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
    age: {
        type: Number,
        required: [true, 'Please provide age'],
    },
    dateBirth: {
        type: Date,
        required: [true, 'Please provide dateBirth'],
    },
    placeBirth: {
        type: String,
        required: [true, 'Please provide placeBirth'],
    },
    content: [{
        type: mongoose.Types.ObjectId,
        ref: 'Content',
    }]
});

module.exports = mongoose.model('Director', DirectorSchema);