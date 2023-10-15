import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../directives/unsubscribe.directive';
import { MemberInterface } from '../interfaces/member.interface';
import { MemberStore } from '../stores/member.store';

@Injectable({
    providedIn: 'root',
})
export class MemberService extends UnsubscribeDirective {
    constructor(private memberStore: MemberStore) {
        super();
    }

    /**
     * Define if the user is a visitor or not (i.e not connected or not a member of the clan
     * @private
     */
    private _isVisitor: boolean;

    /**
     * @see _isVisitor
     */
    get isVisitor(): boolean {
        return this._isVisitor;
    }

    /**
     * Define if the user is an administrator or not
     * @private
     */
    private _isAdmin: boolean;

    /**
     * @see _isAdmin
     */
    get isAdmin(): boolean {
        return this._isAdmin;
    }

    public watchMemberStore(): void {
        this.memberStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: MemberInterface): void => {
                this._isVisitor = value.isVisitor;
                this._isAdmin = value.isAdmin;
            });
    }
}
