const { BadRequestError, UnAuthorizedError } = require("../errors");
const UserModel = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
        throw new BadRequestError('Please provide nickname, email and password');
    }

    const user = await UserModel.create({ ...req.body });

    const token = user.createToken();

    return res.status(StatusCodes.OK).json({ user: { nickname: user.nickname, }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await UserModel.findOne({ email });

    if (!user){
        throw new UnAuthorizedError('Invalid credentials');
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword){
        throw new UnAuthorizedError('Invalid credentials');
    }

    const token = user.createToken();

    return res.status(StatusCodes.OK).json({ user: { nickname: user.nickname, }, token });
}


module.exports = {
    register,
    login,
}