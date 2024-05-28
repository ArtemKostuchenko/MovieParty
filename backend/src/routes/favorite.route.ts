import express, { Router } from "express";
import {
  addFavoriteVideoContent,
  deleteFavoriteVideoContent,
  getFavoriteVideoContentById,
  getFavoritesVideoContent,
} from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.use(authMiddleware);

router.route("/").post(addFavoriteVideoContent).get(getFavoritesVideoContent);

router
  .route("/:id")
  .get(getFavoriteVideoContentById)
  .delete(deleteFavoriteVideoContent);

export default router;
