import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-auth-callback',
    standalone: true,
    template: `<p>Logging in... Please wait</p>`,
})
export class AuthCallbackComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private userService = inject(UserService);

    constructor() {}

    ngOnInit(): void {
        const userId = this.route.snapshot.queryParamMap.get('user_id');
        const token = this.route.snapshot.queryParamMap.get('token');

        if (userId && token) {
            this.userService.setUser({ id: userId, token });
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/login'], {
                queryParams: { error: 'missing_credentials' },
            });
        }
    }
}
