const ActorModel = require('../models/actor.model');
const { validateActorDirector } = require("../utils/validations");
const { NotFoundError } = require('../errors');


class ActorRepository {
    constructor() { }

    async createActor(actorData) {
        validateActorDirector(actorData);

        const actor = await ActorModel.create(actorData);

        return { ...actor._doc, age: actor.age };
    }

    async getActorById(idActor) {
        const actor = await ActorModel.findById(idActor).lean();

        if (!actor) {
            throw new NotFoundError("Actor not found");
        }

        return { ...actor._doc, age: actor.age };
    }

    async updateActorById(idActor, actorData) {
        const { firstName, lastName, originalFullName, photoURL, dateBirth, dateDeath, sex, placeBirth } = actorData;

        const actor = await ActorModel.findById(idActor);

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

    async deleteActorById(idActor) {
        const actor = await ActorModel.findById(idActor);

        if (!actor) {
            throw new NotFoundError("Actor not found");
        }

        await actor.deleteOne();
    }

    async getActors() {
        const actors =  await ActorModel.find({});

        const actorsWithAge = actors.map(actors => {
            return { ...actors._doc, age: actors.age };
        });

        return actorsWithAge;
    }
}

module.exports = new ActorRepository()