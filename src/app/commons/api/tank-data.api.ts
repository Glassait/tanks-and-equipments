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
        private httpClient: HttpClient,
        private inventoryService: InventoryService
    ) {}

    public queryTanksData(accessToken: string): Observable<any> {
        return this.httpClient.get(
            this.inventoryService.getLchpApi()['live-url'] + this.url + '/' + accessToken
        );
    }
}
