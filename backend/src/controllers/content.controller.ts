import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import VideoContentRepository from "../repositories/content.repository";

interface MulterRequest extends Request {
  files?: {
    previewURL?: Express.Multer.File[];
    backgroundURL?: Express.Multer.File[];
  };
}

const createVideoContent = async (
  req: MulterRequest,
  res: Response
): Promise<Response> => {
  req.body.previewURL = req.files?.previewURL?.[0].filename as string;
  req.body.backgroundURL = req.files?.backgroundURL?.[0].filename as string;

  const videoContent = await VideoContentRepository.createVideoContent(
    req.body
  );

  return res.status(StatusCodes.CREATED).json({ data: videoContent });
};

const getVideoContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: idVideoContent } = req.params;

  const videoContent = await VideoContentRepository.getVideoContentById(
    idVideoContent,
    req.user?.id
  );

  return res.status(StatusCodes.OK).json({ data: videoContent });
};

const getVideoContentByOriginTitle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { originTitle } = req.params;

  const videoContent =
    await VideoContentRepository.getVideoContentByOriginTitle(
      originTitle,
      req.user?.id
    );

  return res.status(StatusCodes.OK).json({ data: videoContent });
};

const updateVideoContent = async (
  req: MulterRequest,
  res: Response
): Promise<Response> => {
  const { id: idVideoContent } = req.params;
  req.body.previewURL = req.files?.previewURL?.[0].filename as string;
  req.body.backgroundURL = req.files?.backgroundURL?.[0].filename as string;

  const updatedVideoContent =
    await VideoContentRepository.updateVideoContentById(
      idVideoContent,
      req.body
    );

  return res.status(StatusCodes.OK).json({ data: updatedVideoContent });
};

const deleteVideoContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: idVideoContent } = req.params;

  await VideoContentRepository.deleteVideoContentById(idVideoContent);

  return res.status(StatusCodes.OK).json({ success: true });
};

const getVideoContents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const videoContents = await VideoContentRepository.getVideoContents(
    req.query
  );

  return res.status(StatusCodes.OK).json({ data: videoContents });
};

export {
  createVideoContent,
  getVideoContent,
  getVideoContentByOriginTitle,
  updateVideoContent,
  deleteVideoContent,
  getVideoContents,
};
