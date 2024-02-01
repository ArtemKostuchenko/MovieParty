import PartModel, { Part } from '../models/part.model';
import { BadRequestError, NotFoundError } from '../errors';

class PartRepository {
    constructor() { }

    async createPart(partData: Part): Promise<Part> {
        const { name } = partData;

        if (!name) {
            throw new BadRequestError('Please provide name part');
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

    async getParts(): Promise<Part[]> {
        return await PartModel.find({});
    }
}

export default new PartRepository();
