import express, { Router } from "express";
import {
  createTypeContent,
  getTypeContent,
  updateTypeContent,
  deleteTypeContent,
  getTypesContent,
} from "../controllers/type-content.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.use(authMiddleware);

router.route("/").post(adminMiddleware, createTypeContent).get(getTypesContent);

router
  .route("/:id")
  .get(getTypeContent)
  .patch(adminMiddleware, updateTypeContent)
  .delete(adminMiddleware, deleteTypeContent);

export default router;
