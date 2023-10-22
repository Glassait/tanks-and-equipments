import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService } from '../services/inventory.service';

@Injectable({
    providedIn: 'root',
})
export class InformationApi {
    private url: string = 'information';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly inventoryService: InventoryService
    ) {}

    /**
     * Make the api call to get the information of the clan
     * @param accessToken The access token of the user
     */
    public queryInformation(accessToken: string): Observable<any> {
        return this.httpClient.get(
            this.inventoryService.getGlassaitApi('live-url', this.url, accessToken)
        );
    }
}
