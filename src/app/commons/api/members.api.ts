import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import members from 'src/assets/mocks/members.json';
import { environment } from '../../../environments/environment';
import { MockEnum } from '../enums/mock.enum';
import { InventoryService } from '../services/inventory.service';
import { Member } from '../types/member.type';
import { Observable, of } from 'rxjs';

/**
 * Injectable service that provides methods for interacting with the Glassnode API.
 */
@Injectable({
    providedIn: 'root',
})
export class MembersApi {
    private _members: Member[] = members.members;
    private url: string = 'member?account_id=';

    constructor(
        private httpClient: HttpClient,
        private inventoryService: InventoryService
    ) {}

    /**
     * Returns information about a specific clan member.
     * @param {number} id The account ID of the clan member.
     * @returns {Observable<any>} - Observable that returns the member information.
     */
    public isClanMembers(id: number): Observable<any> {
        if ([MockEnum.NO_MOCK, MockEnum.EXTERNAL_MOCK].includes(environment.mock)) {
            return this.httpClient.get(this.inventoryService.getGlassaitApi()['live-url'] + this.url + id);
        }

        return of(
            this._members.find((member: Member): boolean => id === member.account_id) ??
                ({
                    account_id: null,
                    role: '',
                } as unknown as Member)
        );
    }
}
