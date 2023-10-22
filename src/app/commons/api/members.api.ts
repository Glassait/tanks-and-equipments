import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import members from 'src/assets/json/members.json';
import { environment } from '../../../environments/environment';
import { MockEnum } from '../enums/mock.enum';
import { InventoryService } from '../services/inventory.service';
import { Member } from '../types/member.type';

@Injectable({
    providedIn: 'root',
})
export class MembersApi {
    private _members: Member[] = members.members;
    private url: string = 'member';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly inventoryService: InventoryService
    ) {}

    public isClanMembers(id: number): Member | undefined {
        if (!id) {
            return undefined;
        }
        if ([MockEnum.NO_MOCK, MockEnum.EXTERNAL_MOCK].includes(environment.mock)) {
            this.httpClient
                .get(
                    this.inventoryService.getGlassaitApi('live-url', this.url) + `?account_id=${id}`
                )
                .subscribe({
                    next: value => {
                        return value;
                    },
                    error: err => {
                        console.log(err);
                    },
                    complete: (): void => {},
                });
        }

        return this._members.find((member: Member): boolean => id === member.account_id);
    }
}
