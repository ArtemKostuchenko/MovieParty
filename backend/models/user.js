const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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

UserSchema.pre('save', async function() {
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
});

module.exports = mongoose.model('User', UserSchema);