const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title'],
    },
    originTitle: {
        type: String,
        required: [true, 'Please provide originTitle'],
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
});

module.exports = mongoose.model('Content', ContentSchema);