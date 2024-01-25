
const validateContent = (content) => {
    const { title, originTitle, IMDb, description, releaseDate, duration, previewURL, originCountries, genres, actors, directors, soundTracks } = content;

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

const validateMovie = (movie) => {
    const { soundTracks } = movie;

    if (!Array.isArray(soundTracks) || !soundTracks.every(soundTrack => typeof soundTrack === 'object')) {
        return false;
    }

    return true;
}

const validateActor = (actor) => {
    const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = actor;

    if (!firstName || !lastName || !originalFullName || !photoURL || !age || !dateBirth || !placeBirth) {
        return false;
    }

    return true
}

module.exports = {
    validateContent,
    validateMovie,
    validateActor,
};