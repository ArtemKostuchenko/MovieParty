const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    contents: [{
        placeContent: {
            type: Number
        },
        content: {
            type: mongoose.Types.ObjectId,
            ref: 'Content'
        }
    }]
})

module.exports = mongoose.model('List', ListSchema);