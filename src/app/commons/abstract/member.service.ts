import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../directives/unsubscribe.directive';
import { MemberInterface } from '../interfaces/member.interface';
import { MemberStore } from '../stores/member.store';

@Injectable({
    providedIn: 'root',
})
export class MemberService extends UnsubscribeDirective {
    /**
     * Define if the user is an administrator or not
     */
    public isAdmin: boolean;
    /**
     * Define if the user is a visitor or not (i.e. not connected or not a member of the clan)
     */
    public isVisitor: boolean;

    constructor(private memberStore: MemberStore) {
        super();
    }

    public watchMemberStore(): void {
        this.memberStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
                this.isAdmin = value.isAdmin;
            });
    }
}
