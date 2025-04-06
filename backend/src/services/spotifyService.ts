import axios from 'axios';
import querystring from 'querystring';
import { config } from '../config/env';
import { ITrack } from '../models/interfaces';
import { ApiError } from '../utils/apiError';

const SpotifyAccountsUrl = 'https://accounts.spotify.com';
const SpotifyApiUrl = 'https://api.spotify.com/v1';

export const getAuthUrl = (): string => {
    const scope = 'user-top-read user-read-private user-read-email';

    return (
        `${SpotifyAccountsUrl}/authorize?` +
        querystring.stringify({
            response_type: 'code',
            client_id: config.SPOTIFY.CLIENT_ID,
            scope: scope,
            redirect_uri: config.SPOTIFY.REDIRECT_URI,
        })
    );
};

export const getAccessToken = async (
    code: string
): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}> => {
    try {
        const response = await axios({
            method: 'post',
            url: `${SpotifyAccountsUrl}/api/token`,
            data: querystring.stringify({
                code: code,
                redirect_uri: config.SPOTIFY.REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    Buffer.from(
                        `${config.SPOTIFY.CLIENT_ID}:${config.SPOTIFY.CLIENT_SECRET}`
                    ).toString('base64'),
            },
        });

        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
        };
    } catch (error: any) {
        console.error(
            'Error getting Spotify access token:',
            error.response?.data || error.message
        );
        throw new ApiError(500, 'Failed to get Spotify access token');
    }
};

export const getUserProfile = async (accessToken: string): Promise<string> => {
    try {
        const response = await axios({
            method: 'get',
            url: `${SpotifyApiUrl}/me`,
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.id;
    } catch (error: any) {
        console.error(
            'Error getting user profile:',
            error.response?.data || error.message
        );
        throw new ApiError(500, 'Failed to get user profile from Spotify');
    }
};

export const getTopTracksForUser = async (
    accessToken: string,
    page: number,
    limit: number
): Promise<{ tracks: ITrack[]; total: number }> => {
    try {
        const offset = (page - 1) * limit;
        const response = await axios({
            method: 'get',
            url: `${SpotifyApiUrl}/me/top/tracks`,
            params: {
                limit,
                offset,
                time_range: 'short_term',
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.data.items || response.data.items.length === 0) {
            throw new ApiError(404, 'No top tracks found for this user');
        }

        const topTracks = response.data.items.map((track: any) => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists
                    .map((artist: any) => artist.name)
                    .join(', '),
            };
        });

        return {
            tracks: topTracks,
            total: response.data.total,
        };
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new ApiError(401, 'Spotify access token expired or invalid');
        }
        console.error(
            'Error getting top track:',
            error.response?.data || error.message
        );
        throw new ApiError(500, 'Failed to get top track from Spotify');
    }
};
