import ActorModel, { Actor } from "../models/actor.model";
import { validateActorDirector } from "../utils/validations";
import { NotFoundError } from "../errors";
import { ActorWithAge } from "../utils/interfaces";

interface QueryCondition {
  [key: string]: { $regex: RegExp };
}

interface Query {
  $or?: QueryCondition[];
}
class ActorRepository {
  constructor() {}

  async createActor(actorData: Actor): Promise<ActorWithAge> {
    validateActorDirector(actorData);

    const actor: Actor = await ActorModel.create(actorData);

    return { ...actor.toObject(), age: actor.age };
  }

  async getActorById(actorId: string): Promise<ActorWithAge> {
    const actor = await ActorModel.findById(actorId);

    if (!actor) {
      throw new NotFoundError("Actor not found");
    }

    return { ...actor.toObject(), age: actor.age };
  }

  async getActorByFullName(fullName: string): Promise<ActorWithAge> {
    const splitFullName = fullName.split("-");

    const actor = await ActorModel.find({
      firstNameEng: { $regex: splitFullName[0], $options: "i" },
      lastNameEng: { $regex: splitFullName[1], $options: "i" },
    });

    if (!actor) {
      throw new NotFoundError("Actor not found");
    }

    return { ...actor[0].toObject(), age: actor[0].age };
  }

  async updateActorById(actorId: string, actorData: Actor): Promise<Actor> {
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
    } = actorData;

    const actor = await ActorModel.findById(actorId);

    if (!actor) {
      throw new NotFoundError("Actor not found");
    }

    actor.firstName = firstName || actor.firstName;
    actor.lastName = lastName || actor.lastName;
    actor.firstNameEng = firstNameEng || actor.firstNameEng;
    actor.lastNameEng = lastNameEng || actor.lastNameEng;
    actor.photoURL = photoURL || actor.photoURL;
    actor.dateBirth = dateBirth || actor.dateBirth;
    actor.dateDeath = dateDeath || actor.dateDeath;
    actor.sex = sex || actor.sex;
    actor.placeBirth = placeBirth || actor.placeBirth;

    return await actor.save();
  }

  async deleteActorById(actorId: string): Promise<void> {
    const actor = await ActorModel.findById(actorId);

    if (!actor) {
      throw new NotFoundError("Actor not found");
    }

    await actor.deleteOne();
  }

  async getActors(query: any): Promise<{
    actors: ActorWithAge[];
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

    let actorQuery = ActorModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      actorQuery = actorQuery.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      actorQuery = actorQuery.select(fieldList);
    }

    const actorsPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * actorsPerPage;

    const [actors, totalCount] = await Promise.all([
      actorQuery.skip(skip).limit(actorsPerPage),
      ActorModel.countDocuments(queryObj),
    ]);

    const actorsWithAge: ActorWithAge[] = actors.map((actor: Actor) => {
      return { ...actor.toObject(), age: actor.age };
    });

    return { actors: actorsWithAge, totalCount };
  }
}

export default new ActorRepository();
