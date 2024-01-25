const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
    },
    soundTracks: [{
        title: {
            type: String,
            required: [true, 'Please provide title'],
        },
        m3u8URL: {
            type: String,
            required: [true, 'Please provide m3u8URL'],
        },
    }],
});

module.exports = mongoose.model('Movie', MovieSchema);