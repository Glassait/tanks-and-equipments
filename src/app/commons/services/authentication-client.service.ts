import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArrayCustom } from '../classes/array-custom.class';
import { WindowsCustom } from '../classes/windows-custom.class';
import { InventoryService } from './inventory.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationClientService {
    constructor(
        private http: HttpClient,
        private inventoryClass: InventoryService
    ) {}

    public login(): Observable<any> {
        if (environment.production) {
            if (WindowsCustom.getSearch() === '') {
                WindowsCustom.setCurrentUrl(
                    this.inventoryClass.getWargamingApi().login +
                        `&redirect_uri=${WindowsCustom.getHref()}`
                );
            }
            return of(
                ArrayCustom.transformToObject(
                    WindowsCustom.getSearch().replace('?', '').split('&')
                )
            );
        }

        return this.http.get(this.inventoryClass.getWargamingApi().loginMock);
    }
}
