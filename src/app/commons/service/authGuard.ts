import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { InventoryClass } from '../class/inventory.class';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private inventoryClass: InventoryClass
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> {
        return this.checkLogin();
    }

    checkLogin() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([this.inventoryClass.getPath().home]);
            return of(false);
        }

        return of(true);
    }
}
