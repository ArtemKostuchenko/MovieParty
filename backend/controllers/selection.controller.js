const SelectionModel = require('../models/selection.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createSelection = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new BadRequestError('Please provide name selection');
    }

    const selection = await SelectionModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: selection });
}

const getSelection = async (req, res) => {
    const { id: idSelection } = req.params;

    const selection = await SelectionModel.findById(idSelection);

    if (!selection) {
        throw new NotFoundError("Selection not found");
    }

    return res.status(StatusCodes.OK).json({ data: selection });
}

const updateSelection = async (req, res) => {
    const { name, contents } = req.body;
    const { id: idSelection } = req.params;

    const selection = await SelectionModel.findById(idSelection);

    if (!selection) {
        throw new NotFoundError("Selection not found");
    }

    selection.name = name || selection.name;

    if (contents && Array.isArray(contents)) {
        selection.contents = contents;
    }

    const updatedSelection = await selection.save();

    return res.status(StatusCodes.OK).json({ data: updatedSelection });
}

const deleteSelection = async (req, res) => {
    const { id: idSelection } = req.params;

    const selection = await SelectionModel.findById(idSelection);

    if (!selection) {
        throw new NotFoundError("Selection not found");
    }

    await selection.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getSelections = async (req, res) => {
    const selections = await SelectionModel.find({});

    return res.status(StatusCodes.OK).json({ data: selections });
}

module.exports = {
    createSelection,
    getSelection,
    updateSelection,
    deleteSelection,
    getSelections,
}