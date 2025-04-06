import { NextFunction, Request, Response } from 'express';
import { createOrUpdateUser } from '../repositories/UserRepoistory';
import {
    getAccessToken,
    getAuthUrl,
    getUserProfile,
} from '../services/spotifyService';
import { generateToken } from '../utils/jwt';
import { config } from '../config/env';

export const login = (req: Request, res: Response) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
};

export const callback = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { code } = req.query;

        if (!code || typeof code !== 'string') {
            console.error('Invalid code received from Spotify');
            return res.redirect('/?error=invalid_code');
        }
        const { accessToken, refreshToken, expiresIn } = await getAccessToken(
            code
        );
        const spotifyId = await getUserProfile(accessToken);

        const user = await createOrUpdateUser({
            spotifyId,
            accessToken,
            refreshToken,
            tokenExpiry: new Date(Date.now() + expiresIn * 1000),
        });

        const token = generateToken(user.id);

        res.redirect(
            `${config.CLIENT_URL}/auth/callback?user_id=${user.id}&token=${token}`
        );
    } catch (error) {
        next(error);
    }
};
