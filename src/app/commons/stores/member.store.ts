import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import {
    INTITIAL_STATE_MEMBER,
    MemberInterface,
} from '../interfaces/member.interface';

@Injectable({
    providedIn: 'root',
})
export class MemberStore extends Store<MemberInterface> {
    constructor() {
        super(INTITIAL_STATE_MEMBER);
    }

    public isVisitor(): boolean {
        return this.get('isVisitor');
    }

    public isAdmin(): boolean {
        return this.get('isAdmin');
    }
}
