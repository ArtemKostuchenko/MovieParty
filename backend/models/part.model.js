const mongoose = require('mongoose');

const PartSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Part', PartSchema);