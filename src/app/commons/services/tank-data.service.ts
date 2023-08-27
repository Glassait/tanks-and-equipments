import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberStore } from '../stores/member.store';
import { InventoryService } from './inventory.service';

@Injectable({
    providedIn: 'root',
})
export class TanksDataService {
    constructor(
        private httpClient: HttpClient,
        private inventoryClass: InventoryService,
        private memberStore: MemberStore
    ) {}

    public queryTanksData(): Observable<any> {
        return this.httpClient.get(
            this.inventoryClass.getLchpApi().liveUrl +
                this.inventoryClass.getLchpApi().tanks +
                '/' +
                this.memberStore.get('accessToken')
        );
    }
}
