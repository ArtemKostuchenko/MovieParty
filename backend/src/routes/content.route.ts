import express, { Router } from "express";
import {
  createVideoContent,
  getVideoContent,
  updateVideoContent,
  deleteVideoContent,
  getVideoContents,
  getVideoContentByOriginTitle,
} from "../controllers/content.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";
import uploadFile from "../utils/upload";

const router: Router = express.Router();

router.use(authMiddleware);

router
  .route("/")
  .post(
    adminMiddleware,
    uploadFile("./src/files/images/content").fields([
      {
        name: "previewURL",
        maxCount: 1,
      },
      {
        name: "backgroundURL",
        maxCount: 1,
      },
    ]),
    createVideoContent
  )
  .get(getVideoContents);

router
  .route("/:id")
  .get(getVideoContent)
  .patch(adminMiddleware, updateVideoContent)
  .delete(adminMiddleware, deleteVideoContent);

router.route("/originTitle/:originTitle").get(getVideoContentByOriginTitle);

export default router;
