const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
    },
    responseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
    message: {
        type: String,
        required: [true, 'Please provide message'],
        minLength: 10,
    },
    rate: {
        type: Number,
        required: [true, 'Please provide rate'],
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    edited: {
        type: Boolean,
        default: false,
    },
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});

module.exports = mongoose.model('Review', ReviewSchema);