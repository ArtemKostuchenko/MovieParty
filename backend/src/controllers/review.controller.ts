import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ReviewRepository from "../repositories/review.repository";

const createReview = async (req: Request, res: Response): Promise<Response> => {
  const review = await ReviewRepository.createReview(req.body, req.user?.id);
  return res.status(StatusCodes.OK).json({ data: review });
};

const getReview = async (req: Request, res: Response): Promise<Response> => {
  const { id: idReview } = req.params;

  const review = await ReviewRepository.getReviewById(idReview);

  return res.status(StatusCodes.OK).json({ data: review });
};

const deleteReview = async (req: Request, res: Response): Promise<Response> => {
  const { id: idReview } = req.params;

  await ReviewRepository.deleteReviewById(idReview, req);

  return res.status(StatusCodes.OK).json({ success: true });
};

const getReviewsByOriginNameVideoContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name: originName } = req.params;
  const reviews = await ReviewRepository.getReviewsByOriginNameVideoContent(
    originName
  );

  return res.status(StatusCodes.OK).json({ data: reviews });
};

const getReviews = async (req: Request, res: Response): Promise<Response> => {
  const reviews = await ReviewRepository.getReviews();

  return res.status(StatusCodes.OK).json({ data: reviews });
};

export {
  createReview,
  getReview,
  deleteReview,
  getReviews,
  getReviewsByOriginNameVideoContent,
};
