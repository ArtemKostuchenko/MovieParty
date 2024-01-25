const SelectionRepository = require('../repositories/selection.repository');
const { StatusCodes } = require('http-status-codes');

const createSelection = async (req, res) => {
    const selection = await SelectionRepository.createSelection(req.body);

    return res.status(StatusCodes.CREATED).json({ data: selection });
}

const getSelection = async (req, res) => {
    const { id: idSelection } = req.params;

    const selection = await SelectionRepository.getSelectionById(idSelection);

    return res.status(StatusCodes.OK).json({ data: selection });
}

const updateSelection = async (req, res) => {
    const { id: idSelection } = req.params;

    const updatedSelection = await SelectionRepository.updateSelectionById(idSelection, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedSelection });
}

const deleteSelection = async (req, res) => {
    const { id: idSelection } = req.params;

    await SelectionRepository.deleteSelectionById(idSelection);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getSelections = async (req, res) => {
    const selections = await SelectionRepository.getSelections();

    return res.status(StatusCodes.OK).json({ data: selections });
}

module.exports = {
    createSelection,
    getSelection,
    updateSelection,
    deleteSelection,
    getSelections,
}