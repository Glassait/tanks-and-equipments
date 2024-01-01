import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import { INITIAL_STATE_MEMBER, MemberInterface } from '../interfaces/member.interface';

@Injectable({
    providedIn: 'root',
})
export class MemberStore extends Store<MemberInterface> {
    constructor() {
        super(INITIAL_STATE_MEMBER);
    }
}
