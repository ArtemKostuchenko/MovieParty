const ActorModel = require('../models/actor.model');
const { StatusCodes } = require('http-status-codes');
const ActorRepository = require('../repositories/actor.repository');

const createActor = async (req, res) => {
    const actor = ActorRepository.createActor(req.body);

    return res.status(StatusCodes.CREATED).json({ data: actor });
}

const getActor = async (req, res) => {
    const { id: idActor } = req.params;

    const actor = ActorRepository.getActorById(idActor);

    return res.status(StatusCodes.OK).json({ data: actor });
}

const updateActor = async (req, res) => {
    const { id: idActor } = req.params;

    const updatedActor = await ActorRepository.updateActorById(idActor, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedActor });
}

const deleteActor = async (req, res) => {
    const { id: idActor } = req.params;

    await ActorRepository.deleteActorById(idActor);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getActors = async (req, res) => {
    const actors = await ActorRepository.getActors();

    return res.status(StatusCodes.OK).json({ data: actors });
}

module.exports = {
    createActor,
    getActor,
    updateActor,
    deleteActor,
    getActors,
}