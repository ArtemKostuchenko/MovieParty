import ActorModel, { Actor } from '../models/actor.model';
import { validateActorDirector } from "../utils/validations";
import { NotFoundError } from '../errors';

interface ActorWithAge {
    actor: Actor,
    age: number | string,
}

class ActorRepository {
    constructor() { }

    async createActor(actorData: Actor): Promise<ActorWithAge> {
        validateActorDirector(actorData);

        const actor: Actor = await ActorModel.create(actorData);

        return { ...actor.toObject(), age: actor.age };
    }

    async getActorById(actorId: string): Promise<ActorWithAge> {
        const actor = await ActorModel.findById(actorId).lean();

        if (!actor) {
            throw new NotFoundError("Actor not found");
        }

        return { ...actor.toObject(), age: actor.age };
    }

    async updateActorById(actorId: string, actorData: Actor): Promise<Actor> {
        const { firstName, lastName, originalFullName, photoURL, dateBirth, dateDeath, sex, placeBirth } = actorData;

        const actor = await ActorModel.findById(actorId);

        if (!actor) {
            throw new NotFoundError("Actor not found");
        }

        actor.firstName = firstName || actor.firstName;
        actor.lastName = lastName || actor.lastName;
        actor.originalFullName = originalFullName || actor.originalFullName;
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

    async getActors(): Promise<ActorWithAge[]> {
        const actors = await ActorModel.find({});

        const actorsWithAge: ActorWithAge[] = actors.map((actor: Actor) => {
            return { ...actor.toObject(), age: actor.age };
        });

        return actorsWithAge;
    }
}

export default new ActorRepository();
