import ListModel, { List } from '../models/list.model';
import { BadRequestError, NotFoundError } from '../errors';

class ListRepository {
    constructor() { }

    async createList(listData: List): Promise<List> {
        const { name } = listData;

        if (!name) {
            throw new BadRequestError("Please provide name list");
        }

        return await ListModel.create(listData);
    }

    async getListById(listId: string): Promise<List> {
        const list = await ListModel.findById(listId);

        if (!list) {
            throw new NotFoundError("List not found")
        }

        return list;
    }

    async updateListById(listId: string, listData: List): Promise<List> {
        const { name } = listData;

        const list = await ListModel.findById(listId);

        if (!list) {
            throw new NotFoundError("List not found");
        }

        list.name = name || list.name;

        return await list.save();
    }

    async deleteListById(listId: string): Promise<void> {
        const list = await ListModel.findById(listId);

        if (!list) {
            throw new NotFoundError("List not found");
        }

        await list.deleteOne();
    }

    async getLists(): Promise<List[]> {
        return await ListModel.find({});
    }
}

export default new ListRepository();
