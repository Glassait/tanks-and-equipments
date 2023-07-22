import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryClass } from '../class/inventory.class';

@Injectable({
    providedIn: 'root',
})
export class WotApiService {
    constructor(
        private httpClient: HttpClient,
        private inventoryClass: InventoryClass
    ) {}

    getServeurStatus(): Observable<any> {
        if (environment.production) {
            return this.httpClient.get(
                this.inventoryClass.getWargammingApi().gameServers
            );
        }
        return this.httpClient.get(
            this.inventoryClass.getWargammingApi().gameServersMock
        );
    }

    getClanRatings(): Observable<any> {
        if (environment.production) {
            return this.httpClient.get(
                this.inventoryClass.getWargammingApi().clanRatings
            );
        }
        return this.httpClient.get(
            this.inventoryClass.getWargammingApi().clanRatingsMock
        );
    }

    getMembers(): Observable<any> {
        return this.httpClient.get(
            this.inventoryClass.getWargammingApi().clanMembers
        );
    }
}
