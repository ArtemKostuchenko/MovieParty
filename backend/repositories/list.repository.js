const ListModel = require('../models/list.model');
const { BadRequestError, NotFoundError } = require('../errors');


class ListRepository {
    constructor() { }

    async createList(listData) {
        const { name } = listData;

        if (!name) {
            throw new BadRequestError("Please provide name list");
        }

        return await ListModel.create(listData);
    }

    async getListById(idList) {
        const list = await ListModel.findById(idList);

        if (!list) {
            throw new NotFoundError("List not found")
        }

        return list;
    }

    async updateListById(idList, listData) {
        const { name } = listData;

        const list = await ListModel.findById(idList);

        if (!list) {
            throw new NotFoundError("List not found");
        }

        list.name = name || list.name;

        return await list.save();
    }

    async deleteListById(idList) {
        const list = await ListModel.findById(idList);

        if (!list) {
            throw new NotFoundError("List not found");
        }

        await list.deleteOne();
    }

    async getLists() {
        return await ListModel.find({});
    }
}

module.exports = new ListRepository();