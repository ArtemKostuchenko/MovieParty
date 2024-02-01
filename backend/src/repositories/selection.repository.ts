import SelectionModel, { Selection } from '../models/selection.model';
import { BadRequestError, NotFoundError } from '../errors';

class SelectionRepository {
    constructor() { }

    async createSelection(selectionData: Selection): Promise<Selection> {
        const { name, description } = selectionData;

        if (!name || !description) {
            throw new BadRequestError('Please provide name and description selection');
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

    async updateSelectionById(selectionId: string, selectionData: Selection): Promise<Selection> {
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

    async getSelections(): Promise<Selection[]> {
        return await SelectionModel.find({});
    }
}

export default new SelectionRepository();
