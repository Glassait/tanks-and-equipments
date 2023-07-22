import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from './authenticationClient';
import { MemberStore } from '../stores/member.store';
import { MembersClass } from '../class/members.class';
import { CheckGrade } from '../class/CheckGrade.class';
import { GradeEnum } from '../enum/grade.enum';
import { TokenInterface } from '../interfaces/token.interface';
import { ArrayToObject } from '../class/ArrayToObject.class';
import { MemberInterface } from '../interfaces/member.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private tokenKey = 'token';

    constructor(
        private authenticationClient: AuthenticationClient,
        private router: Router,
        private memberStore: MemberStore,
        private membersClass: MembersClass
    ) {}

    public login(): void {
        this.authenticationClient.login().subscribe(token => {
            const user = this.membersClass.isClanMembers(
                Number(token.account_id)
            );

            this.updateStore(user);

            localStorage.setItem(
                this.tokenKey,
                user ? user.account_id.toString() : ''
            );
            this.router.navigate(['/']);
        });
    }

    public isLoggedIn(): boolean {
        let token = localStorage.getItem(this.tokenKey);
        this.updateStore(this.membersClass.isClanMembers(Number(token)));
        return token != null && token.length > 0 && token !== '';
    }

    public getToken(): number {
        return Number(localStorage.getItem(this.tokenKey));
    }

    private updateStore(user: any) {
        this.memberStore.patch({
            account_id: user?.account_id,
            isAdmin: CheckGrade.isAdmin(user?.role as GradeEnum),
            isVisitor: user ? false : true,
        });
    }
}
