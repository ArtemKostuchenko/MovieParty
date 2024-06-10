import express, { Router } from "express";
import {
  createSubscription,
  successPayment,
  cancelPayment,
  getSubscription,
  cancelSubscription,
  renewSubscription,
} from "../controllers/subscription.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.use(authMiddleware);

router.route("/").post(createSubscription);
router.get("/successPayment", successPayment);
router.get("/cancelPayment", cancelPayment);
router.get("/:id", getSubscription);
router.post("/cancel", cancelSubscription);
router.post("/renew", renewSubscription);

export default router;
