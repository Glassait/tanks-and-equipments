import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MembersApi } from '../api/members.api';
import { MemberStore } from '../stores/member.store';
import { Connection } from '../types/connection.type';
import { Member } from '../types/member.type';
import { CheckGrade } from '../utils/check-grade.util';
import { AuthenticationClientService } from './authentication-client.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private tokenKey: string = 'token';
    private userKey: string = 'user';

    constructor(
        // ANGULAR
        private router: Router,
        // SERVICE
        private authenticationClient: AuthenticationClientService,
        private session: SessionStorageService,
        // STORE
        private memberStore: MemberStore,
        // API
        private membersApi: MembersApi
    ) {}

    public login(): void {
        this.authenticationClient.login().subscribe((token: Connection): void => {
            const user: Member | undefined = this.membersApi.isClanMembers(
                Number(token.account_id)
            );

            this.updateStore(user, token?.access_token);
            this.session.store(this.tokenKey, user ? JSON.stringify(token) : '');
            this.session.store(this.userKey, user ? JSON.stringify(user) : '');
            this.router.navigate(['/']).then((): void => {});
        });
    }

    public isLoggedIn(): boolean {
        const token: Connection | null = this.session.getFromKeyToObject<Connection>(this.tokenKey);
        const user: Member | null = this.session.getFromKeyToObject<Member>(this.userKey);
        this.updateStore(user ?? undefined, token?.access_token);
        return token != null && token?.status === 'ok';
    }

    private updateStore(user: Member | undefined, accessToken: string | undefined): void {
        this.memberStore.patch({
            account_id: user?.account_id,
            isAdmin: CheckGrade.isAdmin(user?.role),
            isVisitor: !user,
            accessToken: accessToken,
        });
    }
}
