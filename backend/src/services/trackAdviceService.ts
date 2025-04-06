import { TrackAdvice } from '../entities/TrackAdvice';
import { ITrack, ITrackAdvice } from '../models/interfaces';
import {
    createAdvice,
    getAdviceByUserAndTrack,
    saveAdvice,
} from '../repositories/TrackAdviceRepository';
import { ApiError } from '../utils/apiError';
import { getAffirmation } from './adviceService';

export async function getTrackAdviceForUser(
    userId: string,
    track: ITrack
): Promise<ITrackAdvice> {
    try {
        const existingAdvice = await getAdviceByUserAndTrack(userId, track.id);
        if (existingAdvice) {
            existingAdvice.searched_at = new Date();
            const updatedTrackAdvice = await saveAdvice(existingAdvice);
            return entityToInterface(userId, updatedTrackAdvice);
        }
        const affirmation = await getAffirmation();

        // advice api is not available
        // const advice = await getAdviceForTrack(track.name);
        const trackAdvice = await createAdvice({
            user_id: userId,
            track_id: track.id,
            track_name: track.name,
            track_artist: track.artist,
            advice: affirmation,
            searched_at: new Date(),
        });

        return entityToInterface(userId, trackAdvice);
    } catch (error: any) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, error.message);
    }
}

const entityToInterface = (
    userId: string,
    entity: TrackAdvice
): ITrackAdvice => {
    const track: ITrack = {
        id: entity.track_id,
        name: entity.track_name,
        artist: entity.track_artist,
    };

    return {
        id: entity.id,
        user_id: userId,
        track,
        advice: entity.advice,
        searched_at: entity.searched_at,
    };
};
