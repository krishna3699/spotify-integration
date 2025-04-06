import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../repositories/UserRepoistory';
import { ApiError } from '../utils/apiError';
import { verifyToken } from '../utils/jwt';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            userId: string;
            spotifyAccessToken?: string;
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new ApiError(401, 'No token provided, authorization denied');
        }

        const decoded = verifyToken(token);
        const { id } = decoded;
        req.userId = id;

        const user = await getUserById(id);
        if (!(user && user.accessToken)) {
            throw new ApiError(401, 'Spotify access token missing');
        }
        req.spotifyAccessToken = user.accessToken;

        next();
    } catch (error: any) {
        console.error('Error in authentication middleware:', error);
        if (error.name === 'TokenExpiredError') {
            next(new ApiError(401, 'Token expired'));
        } else if (error.name === 'JsonWebTokenError') {
            next(new ApiError(401, 'Invalid token'));
        } else {
            next(error);
        }
    }
};

export const authorizeUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.userId !== req.params.user_id) {
        return next(
            new ApiError(403, 'Not authorized to access this resource')
        );
    }
    next();
};
