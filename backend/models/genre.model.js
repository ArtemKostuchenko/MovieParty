const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide genre name'],
    }
});

module.exports = mongoose.model('Genre', GenreSchema);