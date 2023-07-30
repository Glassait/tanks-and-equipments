import { Injectable } from '@angular/core';
import members from 'src/assets/json/members.json';
import { Member } from '../types/member.type';

@Injectable({
    providedIn: 'root',
})
export class MembersService {
    private _members = members.members;

    public isClanMembers(id: number | undefined): Member | undefined {
        if (!id) {
            return undefined;
        }
        return this._members.find(member => id === member.account_id);
    }
}
