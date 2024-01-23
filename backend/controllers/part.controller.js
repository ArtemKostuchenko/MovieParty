const PartModel = require('../models/part.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createPart = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new BadRequestError('Please provide name part');
    }

    const part = await PartModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: part });
}

const getPart = async (req, res) => {
    const { id: idPart } = req.params;

    const part = await PartModel.findById(idPart);

    if (!part) {
        throw new NotFoundError("Part not found");
    }

    return res.status(StatusCodes.OK).json({ data: part });
}

const updatePart = async (req, res) => {
    const { name, contents } = req.body;
    const { id: idPart } = req.params;

    const part = await PartModel.findById(idPart);

    if (!part) {
        throw new NotFoundError("Part not found");
    }

    part.name = name || part.name;

    if(contents && Array.isArray(contents)){
        part.contents = contents;
    }

    const updatedPart = await part.save();

    return res.status(StatusCodes.OK).json({ data: updatedPart });
}

const deletePart = async (req, res) => {
    const { id: idPart } = req.params;

    const part = await PartModel.findById(idPart);

    if (!part) {
        throw new NotFoundError("Part not found");
    }

    await part.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getParts = async(req, res) => {
    const parts = await PartModel.find({});

    return res.status(StatusCodes.OK).json({data: parts});
}

module.exports = {
    createPart,
    getPart,
    updatePart,
    deletePart,
    getParts,
}