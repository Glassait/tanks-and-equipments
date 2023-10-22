import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService } from '../services/inventory.service';

@Injectable({
    providedIn: 'root',
})
export class FeatureFlippingApi {
    private url: string = 'feature';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly inventoryService: InventoryService
    ) {}

    /**
     * Call the api to get all the features and there status
     * @param accessToken The access token of the user
     */
    public queryFeature(accessToken: string): Observable<any> {
        return this.httpClient.get(
            this.inventoryService.getGlassaitApi('live-url', this.url, accessToken)
        );
    }
}
