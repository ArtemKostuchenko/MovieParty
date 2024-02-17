import DirectorModel, { Director } from '../models/director.model';
import { validateActorDirector } from '../utils/validations';
import { NotFoundError } from '../errors';
import { DirectorWithAge } from '../utils/interfaces';


class DirectorRepository {
    constructor() { }

    async createDirector(directorData: Director): Promise<DirectorWithAge> {
        validateActorDirector(directorData);

        const director = await DirectorModel.create(directorData);

        return { ...director.toObject(), age: director.age };
    }

    async getDirectorById(directorId: string): Promise<DirectorWithAge> {
        const director = await DirectorModel.findById(directorId);

        if (!director) {
            throw new NotFoundError("Director not found");
        }

        director.age = director.age;

        return { ...director.toObject(), age: director.age };
    }

    async updateDirectorById(directorId: string, directorData: any): Promise<Director> {
        const { firstName, lastName, originalFullName, photoURL, dateBirth, dateDeath, sex, placeBirth } = directorData;

        const director = await DirectorModel.findById(directorId);

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

    async deleteDirectorById(directorId: string): Promise<void> {
        const director = await DirectorModel.findById(directorId);

        if (!director) {
            throw new NotFoundError("Director not found");
        }

        await director.deleteOne();
    }

    async getDirectors(): Promise<DirectorWithAge[]> {
        const directors = await DirectorModel.find({});

        const directorsWithAge: DirectorWithAge[] = directors.map((director: Director) => {
            return { ...director.toObject(), age: director.age };
        });

        return directorsWithAge;
    }
}

export default new DirectorRepository();
