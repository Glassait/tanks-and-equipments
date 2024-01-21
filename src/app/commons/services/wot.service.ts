import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService } from './inventory.service';

@Injectable({
    providedIn: 'root',
})
export class WotService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly inventoryClass: InventoryService
    ) {}

    /**
     * Get the server status with a http call to the Wargaming api
     */
    public getServeurStatus(): Observable<any> {
        return this.httpClient.get(this.inventoryClass.getWargamingApi('game-servers'));
    }

    /**
     * Get the number of member online with a http call to the Wargaming API
     * @param access_token The access token of the user
     */
    public getMemberOnline(access_token: string): Observable<any> {
        return this.httpClient.get(this.inventoryClass.getWargamingApi('member-online', access_token));
    }

    /**
     * Get all the clan reservations with a http call to the Wargaming API
     * @param access_token The access token of the user
     */
    public getClanReserve(access_token: string): Observable<any> {
        return this.httpClient.get(this.inventoryClass.getWargamingApi('clan_reserves', access_token));
    }
}
