import express, { Router } from "express";
import {
  createDirector,
  getDirector,
  getDirectorByFullName,
  updateDirector,
  deleteDirector,
  getDirectors,
} from "../controllers/director.controller";
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
    uploadFile("./src/files/images/directors").single("photoURL"),
    createDirector
  )
  .get(getDirectors);

router.route("/fullName/:fullName").get(getDirectorByFullName);

router
  .route("/:id")
  .get(getDirector)
  .patch(
    adminMiddleware,
    uploadFile("./src/files/images/directors").single("photoURL"),
    updateDirector
  )
  .delete(adminMiddleware, deleteDirector);

export default router;
