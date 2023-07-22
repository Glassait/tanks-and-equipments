import { Injectable } from '@angular/core';
import members from 'src/assets/json/members.json';

@Injectable({
    providedIn: 'root',
})
export class MembersClass {
    private _members = members.members;

    public isClanMembers(id: number) {
        return this._members.find(member => id === member.account_id);
    }
}
