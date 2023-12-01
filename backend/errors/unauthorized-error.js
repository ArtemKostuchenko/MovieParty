const CustomError = require('./custom-error');
const {StatusCodes} = require('http-status-codes')

class UnAuthorizedError extends CustomError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthorizedError;