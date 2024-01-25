const PartModel = require('../models/part.model');
const { BadRequestError, NotFoundError } = require('../errors');


class PartRepository {
    constructor() { }

    async createPart(partData) {
        const { name } = partData;

        if (!name) {
            throw new BadRequestError('Please provide name part');
        }

        return await PartModel.create(partData);
    }

    async getPartById(idPart) {
        const part = await PartModel.findById(idPart);

        if (!part) {
            throw new NotFoundError("Part not found");
        }
        return part;
    }

    async updatePartById(idPart, partData) {
        const { name, contents } = partData;

        const part = await PartModel.findById(idPart);

        if (!part) {
            throw new NotFoundError("Part not found");
        }

        part.name = name || part.name;

        if (contents && Array.isArray(contents)) {
            part.contents = contents;
        }

        return await part.save();
    }

    async deletePartById(idPart) {
        const part = await PartModel.findById(idPart);

        if (!part) {
            throw new NotFoundError("Part not found");
        }

        await part.deleteOne();
    }

    async getParts() {
        return await PartModel.find({});
    }
}

module.exports = new PartRepository();