import UserModel, { User } from '../models/user.model';
import { UnAuthorizedError } from '../errors';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticatedUser = async(token: string): Promise<User> => {
    try {
        const decoded: any = await jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await UserModel.findById(decoded.userId).select('_id nickname');

        if (!user) {
            throw new UnAuthorizedError("Authentication invalid");
        }

        return user;
    } catch (err) {
        throw new UnAuthorizedError("Authentication invalid");
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    const token = authHeader.split(' ')[1];

    const user: User = await authenticatedUser(token);

    req.body.user = { userId: user._id };

    next(); 
}

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userId: Types.ObjectId = req.body.user.userId;

    const user: User | null = await UserModel.findById(userId);

    if (!user) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    if (!user.isAdmin) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    req.body.user.isAdmin = true;

    next();
}

export { authenticatedUser, authMiddleware, adminMiddleware };
