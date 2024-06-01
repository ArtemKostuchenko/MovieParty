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

const likeReviewById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { reviewId } = req.body;

  await ReviewRepository.likeReviewById(reviewId, req.user?.id);

  return res.status(StatusCodes.OK).json({ success: true });
};

const dislikeReviewById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { reviewId } = req.body;

  await ReviewRepository.dislikeReviewById(reviewId, req.user?.id);

  return res.status(StatusCodes.OK).json({ success: true });
};

const deleteReview = async (req: Request, res: Response): Promise<Response> => {
  const { id: idReview } = req.params;

  await ReviewRepository.deleteReviewById(idReview, req);

  return res.status(StatusCodes.OK).json({ success: true });
};

const getReviewsByVideoContentId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: videoContentId } = req.params;
  const reviews = await ReviewRepository.getReviewsByVideoContentId(
    videoContentId
  );

  return res.status(StatusCodes.OK).json({ data: reviews });
};

const getBestReviewsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: userId } = req.params;
  const reviews = await ReviewRepository.getBestReviewsByUserId(userId);

  return res.status(StatusCodes.OK).json({ data: reviews });
};

const getReviews = async (req: Request, res: Response): Promise<Response> => {
  const reviews = await ReviewRepository.getReviews();

  return res.status(StatusCodes.OK).json({ data: reviews });
};

export {
  createReview,
  getReview,
  likeReviewById,
  dislikeReviewById,
  deleteReview,
  getReviews,
  getReviewsByVideoContentId,
  getBestReviewsByUserId,
};
