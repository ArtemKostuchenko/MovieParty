const SelectionModel = require('../models/selection.model');
const { BadRequestError, NotFoundError } = require('../errors');


class SelectionRepository {
    constructor() { }

    async createSelection(selectionData) {
        const { name, description } = selectionData;

        if (!name || !description) {
            throw new BadRequestError('Please provide name and description selection');
        }

        return await SelectionModel.create(selectionData);
    }

    async getSelectionById(idSelection) {
        const selection = await SelectionModel.findById(idSelection);

        if (!selection) {
            throw new NotFoundError("Selection not found");
        }

        return selection;
    }

    async updateSelectionById(idSelection, selectionData) {
        const { name, description, contents } = selectionData;

        const selection = await SelectionModel.findById(idSelection);

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

    async deleteSelectionById(idSelection) {
        const selection = await SelectionModel.findById(idSelection);

        if (!selection) {
            throw new NotFoundError("Selection not found");
        }

        await selection.deleteOne();
    }

    async getSelections() {
        return await SelectionModel.find({})
    }
}

module.exports = new SelectionRepository();