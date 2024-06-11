import SelectionModel, { Selection } from "../models/selection.model";
import { BadRequestError, NotFoundError } from "../errors";

interface Query {
  name?: { $regex: string; $options: string };
}

class SelectionRepository {
  constructor() {}

  async createSelection(selectionData: Selection): Promise<Selection> {
    const { name, previewURL, description, videoContents } = selectionData;

    if (!name || !previewURL || !description || !videoContents) {
      throw new BadRequestError(
        "Please provide name, previewURL, description and videoContents selection"
      );
    }

    selectionData.videoContents = JSON.parse(videoContents as string);

    return await SelectionModel.create(selectionData);
  }

  async getSelectionById(selectionId: string): Promise<Selection> {
    const selection = await SelectionModel.findById(selectionId).populate(
      "videoContents",
      "_id title"
    );

    if (!selection) {
      throw new NotFoundError("Selection not found");
    }

    return selection;
  }

  async updateSelectionById(
    selectionId: string,
    selectionData: Selection
  ): Promise<Selection> {
    const { name, description, videoContents } = selectionData;

    const selection = await SelectionModel.findById(selectionId);

    if (!selection) {
      throw new NotFoundError("Selection not found");
    }

    selection.name = name || selection.name;
    selection.description = description || selection.description;
    selectionData.videoContents = JSON.parse(videoContents as string);

    if (videoContents && Array.isArray(videoContents)) {
      selection.videoContents = videoContents;
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
