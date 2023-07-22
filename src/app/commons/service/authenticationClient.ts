import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryClass } from '../class/inventory.class';
import { environment } from 'src/environments/environment';
import { ArrayToObject } from '../class/ArrayToObject.class';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationClient {
    constructor(
        private http: HttpClient,
        private inventoryClass: InventoryClass
    ) {}

    public login(): Observable<any> {
        if (environment.production) {
            if (window.location.search === '') {
                window.location.replace(
                    this.inventoryClass.getWargammingApi().login +
                        `&redirect_uri=${window.location.href}`
                );
            }
            const token = window.location.search.replace('?', '').split('&');
            return of(ArrayToObject.transform(token));
        }

        return this.http.get(this.inventoryClass.getWargammingApi().loginMock);
    }
}
