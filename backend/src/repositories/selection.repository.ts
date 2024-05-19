import SelectionModel, { Selection } from '../models/selection.model';
import { BadRequestError, NotFoundError } from '../errors';

interface Query {
  name?: { $regex: string; $options: string };
}

class SelectionRepository {
  constructor() {}

  async createSelection(selectionData: Selection): Promise<Selection> {
    const { name, description } = selectionData;

    if (!name || !description) {
      throw new BadRequestError(
        "Please provide name and description selection"
      );
    }

    return await SelectionModel.create(selectionData);
  }

  async getSelectionById(selectionId: string): Promise<Selection> {
    const selection = await SelectionModel.findById(selectionId);

    if (!selection) {
      throw new NotFoundError("Selection not found");
    }

    return selection;
  }

  async updateSelectionById(
    selectionId: string,
    selectionData: Selection
  ): Promise<Selection> {
    const { name, description, contents } = selectionData;

    const selection = await SelectionModel.findById(selectionId);

    if (!selection) {
      throw new NotFoundError("Selection not found");
    }

    selection.name = name || selection.name;
    selection.description = description || selection.description;

    if (contents && Array.isArray(contents)) {
      selection.contents = contents;
    }

    return await selection.save();
  }

  async deleteSelectionById(selectionId: string): Promise<void> {
    const selection = await SelectionModel.findById(selectionId);

    if (!selection) {
      throw new NotFoundError("Selection not found");
    }

    await selection.deleteOne();
  }

  async getSelections(
    query: any
  ): Promise<{ selections: any[]; totalCount: number }> {
    const { name, fields, sort } = query;

    const queryObj: Query = {};

    if (name) {
      queryObj.name = { $regex: name, $options: "i" };
    }

    let selectionQuery = SelectionModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      selectionQuery = selectionQuery.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      selectionQuery = selectionQuery.select(fieldList);
    }

    const selectionsPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * selectionsPerPage;

    const [selections, totalCount] = await Promise.all([
      selectionQuery.skip(skip).limit(selectionsPerPage),
      SelectionModel.countDocuments(queryObj),
    ]);

    const selectionsWithCounts = selections.map((selection) => ({
      ...selection.toObject(),
      contentCount: 0,
    }));

    return { selections: selectionsWithCounts, totalCount };
  }
}

export default new SelectionRepository();
