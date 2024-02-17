import UserModel, { User } from '../models/user.model';
import { UnAuthorizedError } from '../errors';
import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import passport from 'passport';
import { Types } from 'mongoose';

const authenticatedUser = async (userId: Types.ObjectId): Promise<User> => {
    try {
        const user = await UserModel.findById(userId).select('_id nickname');

        if (!user) {
            throw new UnAuthorizedError("Authentication invalid");
        }

        return user;
    } catch (err) {
        throw new UnAuthorizedError("Authentication invalid");
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
        if (err || !user) {
            throw new UnAuthorizedError("Authentication invalid");
        }

        req.user = user;
        next();
    })(req, res, next);
}

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    if (!req.user.isAdmin) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    next();
}

export { authenticatedUser, authMiddleware, adminMiddleware };
