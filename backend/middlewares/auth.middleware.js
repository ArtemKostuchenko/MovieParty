const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const { UnAuthorizedError } = require('../errors');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = { userId: decoded.userId }

        const user = await UserModel.findById(req.user.userId);

        if (!user) {
            throw new UnAuthorizedError("Authentication invalid");
        }

        next();
    } catch (err) {
        throw new UnAuthorizedError("Authentication invalid");
    }

}

const adminMiddleware = async (req, res, next) => {
    const userId = req.user.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    if (!user.isAdmin) {
        throw new UnAuthorizedError("Authentication invalid");
    }

    next();
}

module.exports = { authMiddleware, adminMiddleware };