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
        private httpClient: HttpClient,
        private inventoryService: InventoryService
    ) {}

    public queryInformation(): Observable<any> {
        return this.httpClient.get(this.inventoryService.getGlassaitApi()['live-url'] + this.url);
    }
}
