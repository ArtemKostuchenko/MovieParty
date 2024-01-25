const DirectorRepository = require('../repositories/director.repository');
const { StatusCodes } = require('http-status-codes');

const createDirector = async (req, res) => {
    const director = await DirectorRepository.createDirector(req.body);

    return res.status(StatusCodes.CREATED).json({ data: director });
}

const getDirector = async (req, res) => {
    const { id: idDirector } = req.params;

    const director = await DirectorRepository.getDirectorById(idDirector);

    return res.status(StatusCodes.OK).json({ data: director });
}

const updateDirector = async (req, res) => {
    const { id: idDirector } = req.params;

    const updatedDirector = await DirectorRepository.updateDirectorById(idDirector, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedDirector });
}

const deleteDirector = async (req, res) => {
    const { id: idDirector } = req.params;

    await DirectorRepository.deleteDirectorById(idDirector);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getDirectors = async (req, res) => {
    const director = await DirectorRepository.getDirectors();

    return res.status(StatusCodes.OK).json({ data: director });
}

module.exports = {
    createDirector,
    getDirector,
    updateDirector,
    deleteDirector,
    getDirectors,
}