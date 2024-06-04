import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthorizedError, NotFoundError } from "../errors";
import TokenModel from "../models/token.model";
import UserModel, { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/email/email";
import UserRepository from "../repositories/user.repository";
import ReviewRepository from "../repositories/review.repository";

const register = async (req: Request, res: Response): Promise<Response> => {
  const { user, token } = await UserRepository.singUpUser(req.body);

  res.cookie("_api_token", token, { httpOnly: true, secure: false });

  return res
    .status(StatusCodes.OK)
    .json({ user: { id: user._id, nickname: user.nickname } });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { user, token } = await UserRepository.loginUser(req.body);

  res.cookie("_api_token", token, { httpOnly: true, secure: false });

  return res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      nickname: user.nickname,
      email: user.email,
      country: user.country,
      sex: user.sex,
      avatarColor: user.avatarColor,
      avatarURL: user.avatarURL,
    },
  });
};

const updateMe = async (req: Request, res: Response): Promise<Response> => {
  req.body.avatarURL = req.file?.filename as string;

  const updatedUser = await UserRepository.updateMe(req.user?.id, req.body);

  return res.status(StatusCodes.OK).json({ user: updatedUser });
};

const updatePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await UserRepository.updatePassword(req.body, req.user?.id);

  return res.status(StatusCodes.OK).json({ success: true });
};

const getUserInfoByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: userId } = req.params;

  const user = await UserRepository.getUserInfoByUserId(userId);

  return res.status(StatusCodes.OK).json({ user });
};

const getMyReviews = async (req: Request, res: Response): Promise<Response> => {
  const reviews = await ReviewRepository.getReviewsByUserId(
    req.user?.id,
    req.query
  );
  return res.status(StatusCodes.OK).json({ data: reviews });
};

const logOut = (req: Request, res: Response) => {
  if (req.cookies._api_token) {
    res.clearCookie("_api_token");
    return res.status(200).json({ success: true });
  } else if (req.session) {
    req.session = null;
    req.logout((err) => {
      if (err) {
        throw new UnAuthorizedError("Authentication invalid");
      }
    });
    return res.status(200).json({ success: true });
  } else {
    throw new UnAuthorizedError("Authentication invalid");
  }
};

const getMe = async (req: any, res: Response): Promise<Response> => {
  const user = await UserRepository.getUserById(req.user.id);

  return res.status(StatusCodes.OK).json({ user });
};

const reqPasswordReset = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide email");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const token = await TokenModel.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }

  let resetToken = crypto.randomBytes(32).toString("hex");

  const salt = await bcrypt.genSalt(10);
  const hashToken = await bcrypt.hash(resetToken, salt);

  await TokenModel.create({
    userId: user._id,
    token: hashToken,
    createdAt: Date.now(),
  });

  const link = `https://${process.env.CLIENT_URL}/password-reset?token=${resetToken}&id=${user._id}`;

  await sendEmail(
    user.email,
    "Запит на скидання паролю",
    {
      name: user.nickname,
      link: link,
    },
    "./templates/requestResetPassword.handlebars"
  );

  return res.status(StatusCodes.OK).json({ success: true });
};

const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, token, password } = req.body;

  if (!userId || !token || !password) {
    throw new BadRequestError("Please provide userId, token and password");
  }

  const resetToken = await TokenModel.findOne({ userId });

  if (!resetToken) {
    throw new UnAuthorizedError("Invalid or expired password reset token");
  }

  const validToken = await bcrypt.compare(token, resetToken.token);

  if (!validToken) {
    throw new UnAuthorizedError("Invalid or expired password reset token");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await UserModel.updateOne(
    { _id: userId },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  await resetToken.deleteOne();

  const user: User | null = await UserModel.findById(userId);

  if (!user) {
    throw new UnAuthorizedError("Invalid or expired password reset token");
  }

  await sendEmail(
    user.email,
    "Пароль успішно змінено",
    {
      name: user.nickname,
    },
    "./templates/resetPassword.handlebars"
  );

  return res.status(StatusCodes.OK).json({ success: true });
};

export {
  register,
  login,
  logOut,
  getMe,
  getUserInfoByUserId,
  getMyReviews,
  updateMe,
  updatePassword,
  reqPasswordReset,
  resetPassword,
};
