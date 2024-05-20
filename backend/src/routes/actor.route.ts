import express, { Router } from "express";
import {
  createActor,
  getActor,
  updateActor,
  deleteActor,
  getActors,
} from "../controllers/actor.controller";
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
    uploadFile("./src/files/images/actors").single("photoURL"),
    createActor
  )
  .get(getActors);

router
  .route("/:id")
  .get(getActor)
  .patch(
    adminMiddleware,
    uploadFile("./src/files/images/actors").single("photoURL"),
    updateActor
  )
  .delete(adminMiddleware, deleteActor);

export default router;
