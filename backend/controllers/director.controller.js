const DirectorModel = require('../models/director.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createDirector = async (req, res) => {
    const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = req.body;

    if (!firstName || !lastName || !originalFullName || !photoURL || !age || !dateBirth || !placeBirth) {
        throw new BadRequestError("Please provide firstName, lastName, originalFullName, photoURL, age, dateBirth and placeBirth");
    }

    const director = await DirectorModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: director });
}

const getDirector = async (req, res) => {
    const { id: idDirector } = req.params;

    const director = await DirectorModel.findById(idDirector);

    if (!director) {
        throw new NotFoundError("Director not found");
    }

    return res.status(StatusCodes.OK).json({ data: director });
}

const updateDirector = async (req, res) => {
    const { firstName, lastName, originalFullName, photoURL, age, dateBirth, placeBirth } = req.body;
    const { id: idDirector } = req.params;

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

    const updatedDirector = await director.save();

    return res.status(StatusCodes.OK).json({ data: updatedDirector });
}

const deleteDirector = async (req, res) => {
    const { id: idDirector } = req.params;

    const director = await DirectorModel.findById(idDirector);

    if (!director) {
        throw new NotFoundError("Director not found");
    }

    await director.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getDirectors = async (req, res) => {
    const director = await DirectorModel.find({});

    return res.status(StatusCodes.OK).json({ data: director });
}

module.exports = {
    createDirector,
    getDirector,
    updateDirector,
    deleteDirector,
    getDirectors,
}