const { StatusCodes } = require('http-status-codes');

const errorMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
    }
    res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorMiddleware;