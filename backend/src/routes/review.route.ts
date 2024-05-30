import express, { Router } from "express";
import {
  createReview,
  getReview,
  deleteReview,
  getReviews,
  getReviewsByOriginNameVideoContent,
} from "../controllers/review.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.route("/").post(createReview).get(getReviews);

router.route("/:id").get(getReview).delete(deleteReview);

router.route("/v/:name").get(getReviewsByOriginNameVideoContent);

export default router;
