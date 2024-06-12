import {
  Strategy as GoogleStrategy,
  StrategyOptions,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import UserModel from "../models/user.model";
import passport from "passport";
import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
};

const googleStrategy = new GoogleStrategy(
  options,
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> => {
    const email: string =
      profile.emails && profile.emails[0] && profile.emails[0].value
        ? profile.emails[0].value
        : "";

    const defaultUser = {
      nickname: `${profile.displayName}`,
      email: email,
      googleId: profile.id,
    };

    const user = await UserModel.findOne({ email }).select("-password");

    if (user) {
      if (!user.googleId) {
        user.googleId = profile.id;
        const updatedUser = await user.save();
        return done(null, updatedUser);
      }
      return done(null, user);
    }

    const createdUser = await UserModel.create(defaultUser);

    return done(null, createdUser);
  }
);

passport.use(googleStrategy);

passport.serializeUser((user: Express.User, done) => {
  if ("_id" in user) return done(null, user._id);

  return done(null);
});

passport.deserializeUser(async (id: Types.ObjectId, done) => {
  const user = await UserModel.findById(id).select("-password");

  if (user) {
    return done(null, user);
  }

  return done(null);
});
