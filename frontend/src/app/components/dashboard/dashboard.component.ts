import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import {
    SpotifyService,
    TopTracksResponse,
    Track,
    TrackAdviceResponse,
} from '../../services/spotify.service';
import { User, UserService } from '../../services/user.service';
import { DialogComponent } from '../dailog/dialog.component';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    tracks: Track[] = [];

    tracks$: Observable<TopTracksResponse> | undefined;

    error: Error | undefined;

    user: User | undefined;
    currentPage = 1;
    totalPages = 1;

    constructor(
        private spotifyService: SpotifyService,
        private userService: UserService,
        private router: Router,
        private dialog: MatDialog,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit(): void {
        this.user = this.userService.getUser();
        this.fetchTracks(this.user?.id, this.currentPage);
    }

    fetchTracks(userId: string | undefined, page: number) {
        if (!userId) {
            this.userService.resetUser();
            this.router.navigate(['/']);
            return;
        }
        this.tracks$ = this.spotifyService.getTopTracks(userId, page, 10).pipe(
            takeUntilDestroyed(this.destroyRef),
            tap((response: TopTracksResponse) => {
                if (response.success) {
                    this.tracks = response.data;
                    this.totalPages = Math.ceil(response.total / 10);
                }
            }),
            catchError((error) => {
                console.error('Error fetching top tracks:', error);
                this.error = error;
                return of({ success: false, data: [], total: 0 });
            })
        );
    }

    openAdvice(track: Track) {
        if (!(this.user && this.user.id)) return;
        this.spotifyService
            .getTrackAdvice(this.user.id, track)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res: TrackAdviceResponse) => {
                if (!res.success) return;

                const { data } = res;
                this.dialog.open(DialogComponent, {
                    data,
                });
            });
    }

    changePage(offset: number) {
        const nextPage = this.currentPage + offset;
        if (nextPage >= 1 && nextPage <= this.totalPages) {
            this.currentPage = nextPage;
            this.fetchTracks(this.user?.id, this.currentPage);
        }
    }

    logout() {
        this.userService.resetUser();
        this.router.navigate(['/']);
    }

    ngOnDestroy(): void {
        this.userService.resetUser();
        console.log('User reset on destroy');
    }
}
