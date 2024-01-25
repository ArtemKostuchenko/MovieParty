const ListRepository = require('../repositories/list.repository');
const { StatusCodes } = require('http-status-codes');

const createList = async (req, res) => {
    const list = await ListRepository.createList(req.body);

    return res.status(StatusCodes.CREATED).json({ data: list })
}

const getList = async (req, res) => {
    const { id: idList } = req.params;

    const list = await ListRepository.getListById(idList);

    return res.status(StatusCodes.OK).json({ data: list });
}

const updateList = async (req, res) => {
    const { id: idList } = req.params;

    const updatedList = await ListRepository.updateListById(idList, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedList });
}

const deleteList = async (req, res) => {
    const { id: idList } = req.params;

    await ListRepository.deleteListById(idList);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getLists = async (req, res) => {
    const lists = await ListRepository.getLists();

    return res.status(StatusCodes.OK).json({ data: lists });
}

module.exports = {
    createList,
    getList,
    updateList,
    deleteList,
    getLists,
}