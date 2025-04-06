import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiError';

export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = 'statusCode' in err ? err.statusCode : 500;
    const message = err.message || 'Something went wrong';

    const isOperational = 'isOperational' in err ? err.isOperational : false;

    if (!isOperational) {
        console.error('ERROR', err);
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
};
