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
        private readonly inventory: InventoryService
    ) {}

    /**
     * Get the server status with a http call to the Wargaming api
     */
    public getServeurStatus(): Observable<any> {
        return this.httpClient.get(this.inventory.getWargamingApi('game-servers'));
    }

    /**
     * Get the number of member online with a http call to the Wargaming API
     * @param access_token The access token of the user
     */
    public getMemberOnline(access_token: string): Observable<any> {
        return this.httpClient.get(this.inventory.getWargamingApi('member-online', access_token));
    }

    /**
     * Get all the clan reserves with a http call to the Wargaming API
     * @param access_token The access token of the user
     */
    public getClanReserve(access_token: string): Observable<any> {
        return this.httpClient.get(this.inventory.getWargamingApi('clan_reserves', access_token));
    }

    /**
     * Activate the clan reserves with a http call to the Wargaming API
     * @param access_token The access token of the user
     * @param level The level of the reserve
     * @param type The type of the reserve
     */
    public activateClanReserve(access_token: string, level: string, type: string): Observable<any> {
        const form = new FormData();
        form.append('application_id', this.inventory.applicationId);
        form.append('access_token', access_token);
        form.append('reserve_level', level);
        form.append('reserve_type', type);
        form.append('language', 'fr');
        return this.httpClient.post(this.inventory.getWargamingApi('activate_reserve'), form);
    }
}
