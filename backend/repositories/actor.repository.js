const { validateActor } = require("../utils/validations");
const ActorModel = require('../models/actor.model');


class ActorRepository {
    constructor() { }

    async createActor(actorData) {
        const validActor = validateActor(actorData);

        if (!validActor) {
            throw new BadRequestError("Please provide firstName, lastName, originalFullName, photoURL, age, dateBirth and placeBirth");
        }

        return await ActorModel.create(req.body);
    }

    async getActorById(idActor) {
        const actor = await ActorModel.findById(idActor);

        if (!actor) {
            throw new NotFoundError("Actor not found");
        }

        return actor;
    }

    async updateActorById(idActor, actorData) {
        const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = actorData;

        const actor = await ActorModel.findById(idActor);

        if (!actor) {
            throw new NotFoundError("Actor not found");
        }

        actor.firstName = firstName || actor.firstName;
        actor.lastName = lastName || actor.lastName;
        actor.originalFullName = originalFullName || actor.originalFullName;
        actor.photoURL = photoURL || actor.photoURL;
        actor.age = age || actor.age;
        actor.dateBirth = dateBirth || actor.dateBirth;
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

    async getActors(){
        return await ActorModel.find({});
    }
}

module.exports = new ActorRepository()