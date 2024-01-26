const VideoContentRepository = require('../repositories/content.repository');
const { StatusCodes } = require('http-status-codes');

const createVideoContent = async (req, res) => {
    const videoContent = await VideoContentRepository.createVideoContent(req.body);

    return res.status(StatusCodes.CREATED).json({ data: videoContent });
}

const getVideoContent = async (req, res) => {
    const { id: idVideoContent } = req.params;

    const videoContent = await VideoContentRepository.getVideoContentById(idVideoContent);


    return res.status(StatusCodes.OK).json({ data: videoContent });
}

const updateVideoContent = async (req, res) => {
    const { id: idVideoContent } = req.params;

    const updatedVideoContent = await VideoContentRepository.updateVideoContentById(idVideoContent, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedVideoContent });
}

const deleteVideoContent = async (req, res) => {
    const { id: idVideoContent } = req.params;

    await VideoContentRepository.deleteVideoContentById(idVideoContent);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getVideoContents = async (req, res) => {
    const videoContents = await VideoContentRepository.getVideoContents(req.query);

    return res.status(StatusCodes.OK).json({ data: videoContents });
}

module.exports = {
    createVideoContent,
    getVideoContent,
    updateVideoContent,
    deleteVideoContent,
    getVideoContents,
}