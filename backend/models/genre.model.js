const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide genre name'],
    },
    contents: [{
        type: mongoose.Types.ObjectId,
        ref: 'Content',
    }],
});

module.exports = mongoose.model('Genre', GenreSchema);