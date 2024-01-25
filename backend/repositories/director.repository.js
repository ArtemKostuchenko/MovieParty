const DirectorModel = require('../models/director.model');
const { validateActorDirector } = require('../utils/validations');
const { BadRequestError, NotFoundError } = require('../errors');

class DirectorRepository {
    constructor() { }

    async createDirector(directorData) {
        const validDirector = validateActorDirector(directorData);

        if (!validDirector) {
            throw new BadRequestError("Please provide firstName, lastName, originalFullName, photoURL, age, dateBirth and placeBirth");
        }

        return await DirectorModel.create(req.body);
    }

    async getDirectorById(idDirector) {
        const director = await DirectorModel.findById(idDirector);

        if (!director) {
            throw new NotFoundError("Director not found");
        }

        return director;
    }

    async updateDirectorById(idDirector, directorData) {
        const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = directorData;

        const director = await DirectorModel.findById(idDirector);

        if (!director) {
            throw new NotFoundError("Director not found");
        }

        director.firstName = firstName || director.firstName;
        director.lastName = lastName || director.lastName;
        director.originalFullName = originalFullName || director.originalFullName;
        director.photoURL = photoURL || director.photoURL;
        director.age = age || director.age;
        director.dateBirth = dateBirth || director.dateBirth;
        director.placeBirth = placeBirth || director.placeBirth;

        return await director.save();
    }

    async deleteDirectorById(idDirector) {
        const director = await DirectorModel.findById(idDirector);

        if (!director) {
            throw new NotFoundError("Director not found");
        }

        await director.deleteOne();
    }

    async getDirectors() {
        return await DirectorModel.find({});
    }
}

module.exports = new DirectorRepository();