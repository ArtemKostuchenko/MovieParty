const ListModel = require('../models/list.model');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createList = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new BadRequestError("Please provide name list");
    }

    const list = await ListModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ data: list })
}

const getList = async (req, res) => {
    const { id: idList } = req.params;

    const list = await ListModel.findById(idList);

    if (!list) {
        throw new NotFoundError("List not found")
    }

    return res.status(StatusCodes.OK).json({ data: list });
}

const updateList = async (req, res) => {
    const { id: idList } = req.params;
    const { name, contents } = req.body;

    const list = await ListModel.findById(idList);

    if (!list) {
        throw new NotFoundError("List not found");
    }

    list.name = name || list.name;

    if (contents && Array.isArray(contents)) {
        list.contents = contents;
    }

    const updatedList = await list.save();

    return res.status(StatusCodes.OK).json({ data: updatedList });
}

const deleteList = async (req, res) => {
    const { id: idList } = req.params;

    const list = await ListModel.findById(idList);

    if (!list) {
        throw new NotFoundError("List not found");
    }

    await list.deleteOne();

    return res.status(StatusCodes.OK).json({ success: true });
}

const getLists = async (req, res) => {
    const lists = await ListModel.find({});

    return res.status(StatusCodes.OK).json({ data: lists });
}

module.exports = {
    createList,
    getList,
    updateList,
    deleteList,
    getLists,
}