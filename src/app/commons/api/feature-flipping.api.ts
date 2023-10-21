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
        private httpClient: HttpClient,
        private inventoryClass: InventoryService
    ) {}

    public queryFeature(): Observable<any> {
        return this.httpClient.get(this.inventoryClass.getGlassaitApi()['live-url'] + this.url);
    }
}
