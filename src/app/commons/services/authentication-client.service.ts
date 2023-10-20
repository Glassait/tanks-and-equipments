import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArrayCustom } from '../utils/array-custom.util';
import { WindowsCustom } from '../utils/windows-custom.util';
import { InventoryService } from './inventory.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationClientService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly inventoryService: InventoryService
    ) {}

    /**
     * Call the Wargaming api to log in the user and get access token
     */
    public login(): Observable<any> {
        if (environment.production) {
            const search: string = WindowsCustom.getSearch();

            if (search === '') {
                WindowsCustom.setCurrentUrl(
                    this.inventoryService.getWargamingApi().login +
                        `&redirect_uri=${WindowsCustom.getHref()}`
                );
            }
            return of(ArrayCustom.transformToObject(search.replace('?', '').split('&')));
        }

        return this.httpClient.get(this.inventoryService.getWargamingApi()['login-mock']);
    }
}
