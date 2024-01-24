const validator = require('validator')

const validateMovie = (req) => {
    const { title, originTitle, IMDb, description, rating, releaseDate, duration, previewURL, backgroundURL, trailerURL, originCountries, genres, actors, directors, lists, part, reviews, soundTracks } = req.body;
    
    if (
        !title ||
        !originTitle ||
        !description ||
        !IMDb ||
        !releaseDate ||
        !duration ||
        !previewURL ||
        !Array.isArray(originCountries) || !originCountries.every(country => typeof country === 'string') ||
        !Array.isArray(genres) || !genres.every(genre => typeof genre === 'string') ||
        !Array.isArray(actors) || !actors.every(actor => typeof actor === 'string') ||
        !Array.isArray(directors) || !directors.every(director => typeof director === 'string') ||
        !Array.isArray(soundTracks) || !soundTracks.every(soundTrack => typeof soundTrack === 'object')
    ) {
        return false;
    }
    return true;
}

module.exports = {
    validateMovie,
};