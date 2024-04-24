import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import VideoContentRepository from '../repositories/content.repository';

const createVideoContent = async (req: Request, res: Response): Promise<Response> => {
    const videoContent = await VideoContentRepository.createVideoContent(req.body);

    return res.status(StatusCodes.CREATED).json({ data: videoContent });
}

const getVideoContent = async (req: Request, res: Response): Promise<Response> => {
    const { id: idVideoContent } = req.params;

    const videoContent = await VideoContentRepository.getVideoContentById(idVideoContent);

    return res.status(StatusCodes.OK).json({ data: videoContent });
}

const getVideoContentByOriginTitle = async (req: Request, res: Response): Promise<Response> => {
    const { originTitle } = req.params;

    const videoContent =
      await VideoContentRepository.getVideoContentByOriginTitle(originTitle);

    return res.status(StatusCodes.OK).json({ data: videoContent });
}

const updateVideoContent = async (req: Request, res: Response): Promise<Response> => {
    const { id: idVideoContent } = req.params;

    const updatedVideoContent = await VideoContentRepository.updateVideoContentById(idVideoContent, req.body);

    return res.status(StatusCodes.OK).json({ data: updatedVideoContent });
}

const deleteVideoContent = async (req: Request, res: Response): Promise<Response> => {
    const { id: idVideoContent } = req.params;

    await VideoContentRepository.deleteVideoContentById(idVideoContent);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getVideoContents = async (req: Request, res: Response): Promise<Response> => {
    const videoContents = await VideoContentRepository.getVideoContents(req.query);

    return res.status(StatusCodes.OK).json({ data: videoContents });
}

export {
    createVideoContent,
    getVideoContent,
    getVideoContentByOriginTitle,
    updateVideoContent,
    deleteVideoContent,
    getVideoContents,
};
