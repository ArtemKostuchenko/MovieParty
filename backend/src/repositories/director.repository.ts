import DirectorModel, { Director } from "../models/director.model";
import { validateActorDirector } from "../utils/validations";
import { NotFoundError } from "../errors";
import { DirectorWithAge } from "../utils/interfaces";

interface QueryCondition {
  [key: string]: { $regex: RegExp };
}

interface Query {
  $or?: QueryCondition[];
}

class DirectorRepository {
  constructor() {}

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

  async updateDirectorById(
    directorId: string,
    directorData: any
  ): Promise<Director> {
    const {
      firstName,
      lastName,
      firstNameEng,
      lastNameEng,
      photoURL,
      dateBirth,
      dateDeath,
      sex,
      placeBirth,
    } = directorData;

    const director = await DirectorModel.findById(directorId);

    if (!director) {
      throw new NotFoundError("Director not found");
    }

    director.firstName = firstName || director.firstName;
    director.lastName = lastName || director.lastName;
    director.firstNameEng = firstNameEng || director.firstNameEng;
    director.lastNameEng = lastNameEng || director.lastNameEng;
    director.photoURL = photoURL || director.photoURL;
    director.dateBirth = dateBirth || director.dateBirth;
    director.dateDeath = dateDeath || director.dateDeath;
    director.sex = sex || director.sex;
    director.placeBirth = placeBirth || director.placeBirth;

    return await director.save();
  }

  async getDirectorByFullName(fullName: string): Promise<DirectorWithAge> {
    const splitFullName = fullName.split("-");

    const director = await DirectorModel.find({
      firstNameEng: { $regex: splitFullName[0], $options: "i" },
      lastNameEng: { $regex: splitFullName[1], $options: "i" },
    });

    if (!director) {
      throw new NotFoundError("Director not found");
    }

    return { ...director[0].toObject(), age: director[0].age };
  }

  async deleteDirectorById(directorId: string): Promise<void> {
    const director = await DirectorModel.findById(directorId);

    if (!director) {
      throw new NotFoundError("Director not found");
    }

    await director.deleteOne();
  }

  async getDirectors(query: any): Promise<{
    directors: DirectorWithAge[];
    totalCount: number;
  }> {
    const { fullName, sort, fields } = query;

    const queryObj: Query = {};

    if (fullName) {
      const regex = new RegExp(fullName, "i");

      queryObj.$or = [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { firstNameEng: { $regex: regex } },
        { lastNameEng: { $regex: regex } },
      ];
    }

    let directorQuery = DirectorModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      directorQuery = directorQuery.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      directorQuery = directorQuery.select(fieldList);
    }

    const directorsPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * directorsPerPage;

    const [directors, totalCount] = await Promise.all([
      directorQuery.skip(skip).limit(directorsPerPage),
      DirectorModel.countDocuments(queryObj),
    ]);

    const directorsWithAge: DirectorWithAge[] = directors.map(
      (director: Director) => {
        return { ...director.toObject(), age: director.age };
      }
    );

    return { directors: directorsWithAge, totalCount };
  }
}

export default new DirectorRepository();
