const mongoose = require('mongoose');

const VideoContentSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title'],
    },
    originTitle: {
        type: String,
        required: [true, 'Please provide originTitle'],
    },
    typeVideoContent: {
        type: String,
        enum: ['movies', 'cartoons', 'serials', 'cartoon-series'], 
        required: true
    },
    IMDb: {
        type: Number,
        required: [true, 'Please provide IMDb'],
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please provide releaseDate'],
    },
    duration: {
        type: String,
        required: [true, 'Please provide duration'],
    },
    previewURL: {
        type: String,
        required: [true, 'Please provide previewURL'],
    },
    backgroundURL: {
        type: String,
    },
    trailerURL: {
        type: String,
    },
    originCountries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
    }],
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
    }],
    directors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
    }],
    lists: [{
        idList: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
        },
        placeInList: {
            type: Number
        },
    }],
    part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part',
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
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
    seasons: [{
        title: {
            type: String,
            required: [true, 'Please provide title'],
        },
        previewURL: {
            type: String,
            required: [true, 'Please provide previewURL'],
        },
        backgroundURL: {
            type: String,
        },
        episodes: [{
            name: {
                type: String,
                required: [true, 'Please provide name'],
            },
            status: {
                type: String,
                required: [true, 'Please provide status'],
            },
            available: {
                type: Boolean,
                default: false,
            },
            releaseDate:{
                type: Date,
                required: [true, 'Please provide releaseDate'],
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
        }]
    }]
});

module.exports = mongoose.model('VideoContent', VideoContentSchema);