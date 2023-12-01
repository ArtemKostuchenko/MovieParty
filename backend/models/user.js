const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
    nickname: {
        type: String,
        required: [true, 'Please provide nickname'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    avatarURL: {
        type: String,
    },
    sex: {
        type: String,
        enum: ['Man', 'Woman']
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'Content' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);