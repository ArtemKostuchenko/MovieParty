const ActorModel = require('../models/actor.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createActor = async (req, res) => {
    const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = req.body;

    if (!firstName || !lastName || !originalFullName || !photoURL || !age || !dateBirth || !placeBirth) {
        throw new BadRequestError("Please provide firstName, lastName, originalFullName, photoURL, age, dateBirth and placeBirth");
    }

    const actor = await ActorModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: actor });
}

const getActor = async (req, res) => {
    const { id: idActor } = req.params;

    const actor = await ActorModel.findById(idActor);

    if (!actor) {
        throw new NotFoundError("Actor not found");
    }

    return res.status(StatusCodes.OK).json({ data: actor });
}

const updateActor = async (req, res) => {
    const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = req.body;
    const { id: idActor } = req.params;

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

    const updatedActor = await actor.save();

    return res.status(StatusCodes.OK).json({ data: updatedActor });
}

const deleteActor = async (req, res) => {
    const { id: idActor } = req.params;

    const actor = await ActorModel.findById(idActor);

    if (!actor) {
        throw new NotFoundError("Actor not found");
    }

    await actor.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getActors = async (req, res) => {
    const actors = await ActorModel.find({});

    return res.status(StatusCodes.OK).json({ data: actors });
}

module.exports = {
    createActor,
    getActor,
    updateActor,
    deleteActor,
    getActors,
}