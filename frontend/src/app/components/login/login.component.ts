import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    standalone: true,
    selector: 'app-login-page',
    imports: [CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(userService: UserService) {
        userService.resetUser;
    }

    login() {
        window.location.href = 'http://localhost:3000/api/auth/login';
    }
}
