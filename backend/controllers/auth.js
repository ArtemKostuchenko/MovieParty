const { BadRequestError } = require("../errors");
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
    res.send('Login User');
}


module.exports = {
    register,
    login,
}