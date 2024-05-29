import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import RatingRepository from "../repositories/rating.repository";

const rateVideoContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { videoContentId, rate } = req.body;
  await RatingRepository.rateVideoContent(videoContentId, req.user?.id, rate);
  return res.status(StatusCodes.OK).json({
    success: true,
  });
};

const getRateByVideoContentAndUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: videoContentId } = req.params;
  const rated = await RatingRepository.getRateByVideoContentAndUserId(
    videoContentId,
    req.user?.id
  );
  return res.status(StatusCodes.OK).json({
    data: rated,
  });
};

export { rateVideoContent, getRateByVideoContentAndUserId };
