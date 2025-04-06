import { Injectable } from '@angular/core';

export interface User {
    id: string;
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private user: User | undefined;
    setUser(user: User) {
        const { token } = user;
        localStorage.setItem('token', token);
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    getUserToken() {
        return this.user?.token;
    }

    resetUser() {
        localStorage.removeItem('token');
        this.user = undefined;
    }
}
