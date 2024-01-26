const DirectorModel = require('../models/director.model');
const { validateActorDirector } = require('../utils/validations');
const { NotFoundError } = require('../errors');

class DirectorRepository {
    constructor() { }

    async createDirector(directorData) {
        validateActorDirector(directorData);

        const director =  await DirectorModel.create(directorData)
        
        return { ...director._doc, age: director.age };
    }

    async getDirectorById(idDirector) {
        const director = await DirectorModel.findById(idDirector);

        if (!director) {
            throw new NotFoundError("Director not found");
        }

        return { ...director._doc, age: director.age };
    }

    async updateDirectorById(idDirector, directorData) {
        const { firstName, lastName, originalFullName, photoURL, dateBirth, dateDeath, sex, placeBirth } = directorData;

        const director = await DirectorModel.findById(idDirector);

        if (!director) {
            throw new NotFoundError("Director not found");
        }

        director.firstName = firstName || director.firstName;
        director.lastName = lastName || director.lastName;
        director.originalFullName = originalFullName || director.originalFullName;
        director.photoURL = photoURL || director.photoURL;
        director.dateBirth = dateBirth || director.dateBirth;
        director.dateDeath = dateDeath || director.dateDeath;
        director.sex = sex || director.sex;
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
        const directors = await DirectorModel.find({});

        const directorsWithAge = directors.map(director => {
            return { ...director._doc, age: director.age };
        });

        return directorsWithAge;
    }
}

module.exports = new DirectorRepository();