import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService } from '../services/inventory.service';

@Injectable({
    providedIn: 'root',
})
export class TanksDataApi {
    private url: string = 'tanks';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly inventoryService: InventoryService
    ) {}

    /**
     * Make the api call to get all the tanks data
     * @param accessToken The access token of the user
     */
    public queryTanksData(accessToken: string): Observable<any> {
        return this.httpClient.get(
            this.inventoryService.getGlassaitApi('live-url', this.url, accessToken)
        );
    }
}
