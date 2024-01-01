import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService } from '../services/inventory.service';

@Injectable({
    providedIn: 'root',
})
export class InformationApi {
    private url: string = 'information?access_token=';

    constructor(
        private httpClient: HttpClient,
        private inventoryService: InventoryService
    ) {}

    public queryInformation(accessToken: string): Observable<any> {
        return this.httpClient.get(this.inventoryService.getGlassaitApi()['live-url'] + this.url + accessToken);
    }
}
