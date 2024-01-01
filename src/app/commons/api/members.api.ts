import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import members from 'src/assets/mocks/members.json';
import { environment } from '../../../environments/environment';
import { MockEnum } from '../enums/mock.enum';
import { InventoryService } from '../services/inventory.service';
import { Member } from '../types/member.type';

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

    public isClanMembers(id: number): Member {
        if ([MockEnum.NO_MOCK, MockEnum.EXTERNAL_MOCK].includes(environment.mock)) {
            this.httpClient.get(this.inventoryService.getGlassaitApi()['live-url'] + this.url + id).subscribe({
                next: value => {
                    return value;
                },
                error: err => {
                    console.log(err);
                },
                complete: (): void => {},
            });
        }

        return (
            this._members.find((member: Member): boolean => id === member.account_id) ??
            ({
                account_id: null,
                role: '',
            } as unknown as Member)
        );
    }
}
