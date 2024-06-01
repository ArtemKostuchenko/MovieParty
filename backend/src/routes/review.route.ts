import express, { Router } from "express";
import {
  createReview,
  getReview,
  deleteReview,
  getReviews,
  getReviewsByVideoContentId,
  likeReviewById,
  dislikeReviewById,
  getBestReviewsByUserId,
} from "../controllers/review.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.use(authMiddleware);

router.route("/").post(createReview).get(getReviews);

router.route("/like").post(likeReviewById);
router.route("/dislike").post(dislikeReviewById);

router.route("/:id").get(getReview).delete(deleteReview);

router.route("/v/:id").get(getReviewsByVideoContentId);

router.route("/bests/user/:id").get(getBestReviewsByUserId);

export default router;
