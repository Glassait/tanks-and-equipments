import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArrayCustom } from '../utils/array-custom.util';
import { WindowsCustom } from '../utils/windows-custom.util';
import { InventoryService } from './inventory.service';

/**
 * Service for handling authentication with the Wargaming API
 */
@Injectable({
    providedIn: 'root',
})
export class AuthenticationClientService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly inventoryService: InventoryService
    ) {}

    /**
     * Logs in the user and retrieves an access token
     * @returns {Observable} that resolves with the user's access token
     */
    public login(): Observable<any> {
        if (environment.production) {
            const search: string = WindowsCustom.getSearch();

            if (search === '') {
                WindowsCustom.setCurrentUrl(this.inventoryService.getWargamingApi('login', WindowsCustom.getHref()));
            }
            return of(ArrayCustom.transformToObject(search.replace('?', '').split('&')));
        }

        return this.httpClient.get(this.inventoryService.getWargamingApi('login-mock'));
    }
}
