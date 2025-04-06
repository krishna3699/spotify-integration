import { AppDataSource } from '../config/data-source';
import { TrackAdvice } from '../entities/TrackAdvice';
import { ApiError } from '../utils/apiError';
import { getUserById } from './UserRepoistory';

const trackAdviceRepo = AppDataSource.getRepository(TrackAdvice);

export const saveAdvice = async (
    trackAdvice: TrackAdvice
): Promise<TrackAdvice> => {
    return await trackAdviceRepo.save(trackAdvice);
};

export const createAdvice = async (data: {
    user_id: string;
    track_id: string;
    track_name: string;
    track_artist: string;
    advice: string;
    searched_at?: Date;
}): Promise<TrackAdvice> => {
    try {
        const user = await getUserById(data.user_id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const advice = trackAdviceRepo.create({
            user,
            track_id: data.track_id,
            track_name: data.track_name,
            track_artist: data.track_artist,
            advice: data.advice,
            searched_at: data.searched_at || new Date(),
        });

        return await trackAdviceRepo.save(advice);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'Failed to create track advice');
    }
};

export const getAdviceByUserId = async (
    userId: string
): Promise<TrackAdvice[]> => {
    try {
        return await trackAdviceRepo.find({
            where: {
                user: { id: userId },
            },
        });
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'Failed to fetch track advice');
    }
};

// (Optional) Get a specific advice by trackId and userId
export const getAdviceByUserAndTrack = async (
    userId: string,
    trackId: string
): Promise<TrackAdvice | null> => {
    try {
        return await trackAdviceRepo.findOne({
            where: {
                user: { id: userId },
                track_id: trackId,
            },
        });
    } catch (error) {
        throw new ApiError(500, 'Failed to fetch track advice for the track');
    }
};
