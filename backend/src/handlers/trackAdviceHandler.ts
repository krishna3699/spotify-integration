import { NextFunction, Request, Response } from 'express';
import { getTopTracksForUser } from '../services/spotifyService';
import { getTrackAdviceForUser } from '../services/trackAdviceService';

export const getTrackAdvice = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user_id } = req.params;
        const { track } = req.body;

        const trackAdvice = await getTrackAdviceForUser(user_id, track);

        res.status(200).json({
            success: true,
            data: trackAdvice,
        });
    } catch (error) {
        next(error);
    }
};

export const getTopTracks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.spotifyAccessToken as string;

        const page = parseInt(req.query?.page as string) || 1;
        const limit = parseInt(req.query?.limit as string) || 10;

        const result = await getTopTracksForUser(accessToken, page, limit);

        res.status(200).json({
            success: true,
            data: result.tracks,
            total: result.total,
        });
    } catch (error) {
        next(error);
    }
};
