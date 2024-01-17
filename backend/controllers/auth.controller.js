const { BadRequestError, UnAuthorizedError, NotFoundError } = require("../errors");
const { StatusCodes } = require('http-status-codes');
const TokenModel = require('../models/token.model');
const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { sendEmail } = require('../utils/email/email');

const register = async (req, res) => {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
        throw new BadRequestError('Please provide nickname, email and password');
    }

    const user = await UserModel.create({ ...req.body });

    const token = user.createToken();

    return res.status(StatusCodes.OK).json({ user: { id: user._id, nickname: user.nickname, }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new UnAuthorizedError('Invalid credentials');
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) {
        throw new UnAuthorizedError('Invalid credentials');
    }

    const token = user.createToken();

    return res.status(StatusCodes.OK).json({ user: { id: user._id, nickname: user.nickname, }, token });
}

const getMe = async (req, res) => {
    const user = await UserModel.findById(req.user.userId).select('-password');

    return res.status(StatusCodes.OK).json({ user });
}

const reqPasswordReset = async (req, res) => {
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

    await TokenModel.create({ userId: user._id, token: hashToken, createdAt: Date.now() });

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
}

const resetPassword = async (req, res) => {
    const { userId, token, password } = req.body;

    if (!userId || !token, !password) {
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

    await UserModel.updateOne({ _id: userId }, { $set: { password: hashedPassword } }, { new: true });

    await resetToken.deleteOne();

    const user = await UserModel.findById(userId);

    await sendEmail(
        user.email,
        "Пароль успішно змінено",
        {
            name: user.nickname,
        },
        "./templates/resetPassword.handlebars"
    );

    return res.status(StatusCodes.OK).json({ success: true });
}


module.exports = {
    register,
    login,
    getMe,
    reqPasswordReset,
    resetPassword,
}