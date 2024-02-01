import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ReviewRepository from '../repositories/review.repository';

const getReview = async (req: Request, res: Response): Promise<Response> => {
    const { id: idReview } = req.params;

    const review = await ReviewRepository.getReviewById(idReview);

    return res.status(StatusCodes.OK).json({ data: review });
}

const deleteReview = async (req: Request, res: Response): Promise<Response> => {
    const { id: idReview } = req.params;

    await ReviewRepository.deleteReviewById(idReview, req);

    return res.status(StatusCodes.OK).json({ success: true });
}

const getReviews = async (req: Request, res: Response): Promise<Response> => {
    const reviews = await ReviewRepository.getReviews();

    return res.status(StatusCodes.OK).json({ data: reviews });
}

export {
    getReview,
    deleteReview,
    getReviews,
};
