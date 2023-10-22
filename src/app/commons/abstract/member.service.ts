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
    /**
     * The Wargaming access token of the user, get from the login
     */
    public accessToken: string;
    /**
     * If there is an error on the access token
     */
    public hasErrorOnAccessToken: boolean;

    constructor(private memberStore: MemberStore) {
        super();

        this.isAdmin = this.memberStore.get('isAdmin');
        this.accessToken = this.memberStore.get('accessToken');
        this.isVisitor = this.memberStore.get('isVisitor');
        this.hasErrorOnAccessToken = this.memberStore.get('hasErrorOnAccessToken');

        this.watchMemberStore();
    }

    private watchMemberStore(): void {
        this.memberStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
                this.isAdmin = value.isAdmin;
                this.accessToken = value.accessToken;
                this.hasErrorOnAccessToken = value.hasErrorOnAccessToken;
            });
    }
}
