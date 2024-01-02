import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { InventoryService } from './inventory.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private inventory: InventoryService
    ) {}

    canActivate(): boolean | Observable<boolean> {
        return this.checkLogin();
    }

    private checkLogin(): Observable<boolean> {
        if (!this.authService.loginFromCookie()) {
            this.router.navigate([this.inventory.getPath().home]).then((): void => {
                // Ignored
            });
            return of(false);
        }

        return of(true);
    }
}
