const PartRepository = require('../repositories/part.repository');
const { StatusCodes } = require('http-status-codes');

const createPart = async (req, res) => {
    const part = await PartRepository.createPart(req.body);

    return res.status(StatusCodes.CREATED).json({ data: part });
}

const getPart = async (req, res) => {
    const { id: idPart } = req.params;

    const part = await PartRepository.getPartById(idPart);

    return res.status(StatusCodes.OK).json({ data: part });
}

const updatePart = async (req, res) => {
    const { id: idPart } = req.params;

    const updatedPart = await PartRepository.updatePartById(idPart, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedPart });
}

const deletePart = async (req, res) => {
    const { id: idPart } = req.params;

    await PartRepository.deletePartById(idPart);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getParts = async (req, res) => {
    const parts = await PartRepository.getParts();

    return res.status(StatusCodes.OK).json({ data: parts });
}

module.exports = {
    createPart,
    getPart,
    updatePart,
    deletePart,
    getParts,
}