import UserModel, { User } from '../models/user.model';
import { UnAuthorizedError } from '../errors';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded: any = await jwt.verify(token, process.env.JWT_SECRET as string);

        req.body.user = { userId: decoded.userId };

        const user: User | null = await UserModel.findById(req.body.user.userId);

        if (!user) {
            throw new UnAuthorizedError("Authentication invalid");
        }

        next();
    } catch (err) {
        throw new UnAuthorizedError("Authentication invalid");
    }
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

export { authMiddleware, adminMiddleware };
