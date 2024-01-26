const { BadRequestError} = require('../errors');

const validateVideoContent = (videoContent) => {
    const errors = [];

    if (!videoContent.title) {
        errors.push('title');
    }

    if (!videoContent.originTitle) {
        errors.push('originTitle');
    }

    if (!videoContent.typeVideoContent) {
        errors.push('typeVideoContent');
    } else if (!['movies', 'cartoons', 'serials', 'cartoon-series'].includes(videoContent.typeVideoContent)) {
        errors.push('typeVideoContent (must be movies', 'cartoons', 'serials', 'cartoon-series)');
    }


    if (!videoContent.IMDb) {
        errors.push('IMDb');
    }

    if (!videoContent.description) {
        errors.push('description');
    }

    if (!videoContent.releaseDate) {
        errors.push('releaseDate videoContent');
    }

    if (!videoContent.duration) {
        errors.push('duration');
    }

    if (!videoContent.previewURL) {
        errors.push('preview videoContent');
    }

    if (!videoContent.originCountries) {
        errors.push('originCountries');
    } else if (!Array.isArray(videoContent.originCountries)) {
        errors.push('originCountries');
    } else if (videoContent.originCountries.length == 0) {
        errors.push('originCountries (must be 1 country)');
    }

    if (!videoContent.genres) {
        errors.push('genres');
    } else if (!Array.isArray(videoContent.genres)) {
        errors.push('genres');
    } else if (videoContent.genres.length == 0) {
        errors.push('genres (must be 1 genre)');
    }

    if (!videoContent.actors) {
        errors.push('actors');
    } else if (!Array.isArray(videoContent.actors)) {
        errors.push('actors');
    } else if (videoContent.actors.length == 0) {
        errors.push('actors (must be 1 actor)');
    }

    if (!videoContent.directors) {
        errors.push('directors');
    } else if (!Array.isArray(videoContent.directors)) {
        errors.push('directors');
    } else if (videoContent.directors.length == 0) {
        errors.push('directors (must be 1 director)');
    }

    if (!videoContent.lists) {
        errors.push('lists');
    } else if (!Array.isArray(videoContent.lists)) {
        errors.push('lists');
    }

    if (videoContent.soundTracks && !Array.isArray(videoContent.soundTracks)) {
        errors.push('soundTracks');
    }
    
    if (videoContent.seasons && !Array.isArray(videoContent.seasons)) {
        errors.push('seasons');
    }

    if(errors.length > 0){
       throw new BadRequestError(`Please provide ${errors.join(', ')}`);
    }
}

const validateActorDirector = (person) => {
    const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = person;

    if (!firstName || !lastName || !originalFullName || !photoURL || !age || !dateBirth || !placeBirth) {
        return false;
    }

    return true
}

module.exports = {
    validateVideoContent,
    validateActorDirector,
};