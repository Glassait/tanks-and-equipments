import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from './authenticationClient';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private tokenKey = 'token';

    constructor(
        private authenticationClient: AuthenticationClient,
        private router: Router
    ) {}

    public login(): void {
        this.authenticationClient.login().subscribe(token => {
            console.log(token);
            
            localStorage.setItem(this.tokenKey, token);
            this.router.navigate(['/']);
        });
    }

    public isLoggedIn(): boolean {
        let token = localStorage.getItem(this.tokenKey);
        return token != null && token.length > 0;
    }

    public getToken(): string | null {
        return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
    }
}
