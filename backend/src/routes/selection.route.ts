import express, { Router } from "express";
import {
  createSelection,
  getSelection,
  updateSelection,
  deleteSelection,
  getSelections,
} from "../controllers/selection.controller";
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
    uploadFile("./src/files/images/selections").single("previewURL"),
    createSelection
  )
  .get(getSelections);

router
  .route("/:id")
  .get(getSelection)
  .patch(
    adminMiddleware,
    uploadFile("./src/files/images/selections").single("previewURL"),
    updateSelection
  )
  .delete(adminMiddleware, deleteSelection);

export default router;
