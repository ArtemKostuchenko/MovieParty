import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
    }
    res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorMiddleware;
