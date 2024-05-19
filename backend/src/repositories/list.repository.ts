import ListModel, { List } from "../models/list.model";
import { BadRequestError, NotFoundError } from "../errors";

interface Query {
  name?: { $regex: string; $options: string };
}

class ListRepository {
  constructor() {}

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
      throw new NotFoundError("List not found");
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

  async getLists(query: any): Promise<{ bestLists: List[]; totalCount: number }> {
    const { name, fields, sort } = query;

    const queryObj: Query = {};

    if (name) {
      queryObj.name = { $regex: name, $options: "i" };
    }

    let bestListsQuery = ListModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      bestListsQuery = bestListsQuery.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      bestListsQuery = bestListsQuery.select(fieldList);
    }

     const bestListsPerPage = query.limit || 20;
     const page = query.page || 1;
     const skip = (page - 1) * bestListsPerPage;

    const [bestLists, totalCount] = await Promise.all([
      bestListsQuery.skip(skip).limit(bestListsPerPage),
      ListModel.countDocuments(queryObj),
    ]);

    return { bestLists, totalCount };
  }
}

export default new ListRepository();
