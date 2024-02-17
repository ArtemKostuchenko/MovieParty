import { Strategy as JWTStrategy, StrategyOptions } from 'passport-jwt';
import { cookieExtractor } from '../utils/functions';
import { JWTPayload } from '../utils/interfaces';
import UserModel from '../models/user.model';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const options: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET as string,
}

const jwtStrategy: JWTStrategy = new JWTStrategy(options, async (payload: JWTPayload, done): Promise<void> => {
    const user = await UserModel.findById(payload._id).select('-passport');

    if (!user) {
        return done(null);
    }

    return done(null, user);
})

passport.use(jwtStrategy);
