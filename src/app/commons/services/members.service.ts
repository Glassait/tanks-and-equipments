import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import members from 'src/assets/json/members.json';
import { environment } from '../../../environments/environment';
import { MockEnum } from '../enums/mock.enum';
import { Member } from '../types/member.type';
import { InventoryService } from './inventory.service';

@Injectable({
    providedIn: 'root',
})
export class MembersService {
    private _members: Member[] = members.members;

    constructor(
        private httpClient: HttpClient,
        private inventoryClass: InventoryService
    ) {}

    public isClanMembers(id: number | undefined): Member | undefined {
        if (!id) {
            return undefined;
        }
        if (
            [MockEnum.NO_MOCK, MockEnum.EXTERNAL_MOCK].includes(
                environment.mock
            )
        ) {
            this.httpClient
                .get(
                    this.inventoryClass.getLchpApi().liveUrl +
                        this.inventoryClass.getLchpApi().member +
                        '/' +
                        id
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

        return this._members.find(
            (member: Member): boolean => id === member.account_id
        );
    }
}
