export interface IUser {
    id: string;
    spotifyId: string;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiry?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITrack {
    id: string;
    name: string;
    artist: string;
}

export interface ITrackAdvice {
    id?: string;
    user_id: string;
    track: ITrack;
    advice: string;
    searched_at: Date;
}
