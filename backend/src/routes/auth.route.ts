import express, { Router } from "express";
import {
  register,
  login,
  getMe,
  reqPasswordReset,
  resetPassword,
  logOut,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import FavoriteRouter from "./favorite.route";
import passport from "passport";

const router: Router = express.Router();

router.use("/me/favorites", FavoriteRouter);

router.post("/register", register);
router.post("/login", login);

// google oauth2.0
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later",
    failureRedirect: "http://localhost:3000/login/fail",
    successRedirect: "http://localhost:3000/login/success",
  })
);

router.post("/password/req-reset", reqPasswordReset);
router.post("/password/reset", resetPassword);
router.get("/me", authMiddleware, getMe);
router.post("/logout", logOut);

export default router;
