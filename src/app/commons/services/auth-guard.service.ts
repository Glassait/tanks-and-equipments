import { Injectable } from '@angular/core';
import {
    Router,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { InventoryService } from './inventory.service';
import { Observable, of } from 'rxjs';

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

    checkLogin() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([this.inventory.getPath().home]);
            return of(false);
        }

        return of(true);
    }
}
