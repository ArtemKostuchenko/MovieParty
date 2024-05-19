import PartModel, { Part } from "../models/part.model";
import VideoContentModel from "../models/content.model";
import { BadRequestError, NotFoundError } from "../errors";

interface Query {
  name?: { $regex: string; $options: string };
}

class PartRepository {
  constructor() {}

  async createPart(partData: Part): Promise<Part> {
    const { name } = partData;

    if (!name) {
      throw new BadRequestError("Please provide name part");
    }

    return await PartModel.create(partData);
  }

  async getPartById(partId: string): Promise<Part> {
    const part = await PartModel.findById(partId);

    if (!part) {
      throw new NotFoundError("Part not found");
    }
    return part;
  }

  async updatePartById(partId: string, partData: Part): Promise<Part> {
    const { name } = partData;

    const part = await PartModel.findById(partId);

    if (!part) {
      throw new NotFoundError("Part not found");
    }

    part.name = name || part.name;

    return await part.save();
  }

  async deletePartById(partId: string): Promise<void> {
    const part = await PartModel.findById(partId);

    if (!part) {
      throw new NotFoundError("Part not found");
    }

    await part.deleteOne();
  }

  async getParts(
    query: any
  ): Promise<{ parts: any[]; totalCount: number }> {
    const { name, fields, sort } = query;

    const queryObj: Query = {};

    if (name) {
      queryObj.name = { $regex: name, $options: "i" };
    }

    let partsQuery = PartModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      partsQuery = partsQuery.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      partsQuery = partsQuery.select(fieldList);
    }

    const partsPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * partsPerPage;

    const [parts, totalCount] = await Promise.all([
      partsQuery.skip(skip).limit(partsPerPage),
      PartModel.countDocuments(queryObj),
    ]);

    const partIds = parts.map((part) => part._id);

    const contentCounts = await VideoContentModel.aggregate([
      { $match: { parts: { $in: partIds } } },
      { $unwind: "$parts" },
      { $match: { parts: { $in: partIds } } },
      { $group: { _id: "$parts", count: { $sum: 1 } } },
    ]);

    const contentCountMap = contentCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const partsWithCounts = parts.map((list) => ({
      ...list.toObject(),
      contentCount: contentCountMap[list._id] || 0,
    }));

    return { parts: partsWithCounts, totalCount };
  }
}

export default new PartRepository();
