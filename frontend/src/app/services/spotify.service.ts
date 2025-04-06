import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TopTracksResponse {
    success: boolean;
    data: Track[];
    total: number;
}
export interface TrackAdviceResponse {
    success: boolean;
    data: TrackAdvice;
}
export interface TrackAdvice {
    id: string;
    user_id: string;
    track: Track;
    advice: string;
    searched_at: Date;
}
export interface Track {
    id: string;
    name: string;
    artist: string;
}

@Injectable({
    providedIn: 'root',
})
export class SpotifyService {
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    handleSpotifyCallback(code: string) {
        return this.http.get(`${this.baseUrl}/callback?code=${code}`);
    }

    getTopTracks(userId: string, page: number, limit: number): Observable<TopTracksResponse> {
        const params = new HttpParams().set('page', page).set('limit', limit);
        return this.http.get<TopTracksResponse>(`${this.baseUrl}/user/${userId}/top-tracks`, {
            params,
        });
    }

    getTrackAdvice(userId: string, track: Track): Observable<TrackAdviceResponse> {
        return this.http.post<TrackAdviceResponse>(`${this.baseUrl}/user/${userId}/advice`, {
            track,
        });
    }
}
