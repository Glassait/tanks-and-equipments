import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import members from 'src/assets/mocks/members.json';
import { environment } from '../../../environments/environment';
import { MockEnum } from '../enums/mock.enum';
import { InventoryService } from '../services/inventory.service';
import { Member } from '../types/member.type';
import { Observable, of } from 'rxjs';

/**
 * Injectable service that provides methods for interacting with the Glassait API.
 */
@Injectable({
    providedIn: 'root',
})
export class MembersApi {
    //region PRIVATE FIELD
    /**
     * The mock file
     * @private
     */
    private _members: Member[] = members.members;
    /**
     * All the base ulr for the member api
     * @private
     */
    private url = { getMember: 'member?account_id=', updateMember: 'member/update?access_token=' };

    //endregion

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
            return this.httpClient.get(this.inventoryService.getGlassaitApi()['live-url'] + this.url.getMember + id);
        }

        return of(
            this._members.find((member: Member): boolean => id === member.account_id) ??
                ({
                    account_id: null,
                    role: '',
                } as unknown as Member)
        );
    }

    /**
     * Update the database members
     * @param access_token The wot access token of the user
     */
    public updateMember(access_token: string): Observable<any> {
        if ([MockEnum.NO_MOCK, MockEnum.EXTERNAL_MOCK].includes(environment.mock)) {
            return this.httpClient.post(this.inventoryService.getGlassaitApi()['live-url'] + this.url.updateMember + access_token, {});
        }

        return of('Databased updated');
    }
}
