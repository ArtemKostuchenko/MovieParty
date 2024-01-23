const mongoose = require('mongoose');

const PartSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contents: [{
        type: mongoose.Types.ObjectId,
        ref: 'Content',
    }],
});

module.exports = mongoose.model('Part', PartSchema);