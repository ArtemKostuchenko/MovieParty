const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    }
});

module.exports = mongoose.model('List', ListSchema);