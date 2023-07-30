import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClientService } from './authentication-client.service';
import { MemberStore } from '../stores/member.store';
import { MembersService } from './members.service';
import { CheckGrade } from '../classes/check-grade.class';
import { SessionStorageService } from './session-storage.service';
import { Member } from '../types/member.type';
import { Connection } from '../types/connection.type';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private tokenKey = 'token';

    constructor(
        private authenticationClient: AuthenticationClientService,
        private router: Router,
        private memberStore: MemberStore,
        private members: MembersService,
        private session: SessionStorageService
    ) {}

    public login(): void {
        this.authenticationClient.login().subscribe((token: Connection) => {
            const user = this.members.isClanMembers(Number(token.account_id));

            this.updateStore(user, token?.access_token);
            this.session.store(
                this.tokenKey,
                user ? JSON.stringify(token) : ''
            );
            this.router.navigate(['/']);
        });
    }

    public isLoggedIn(): boolean {
        localStorage.clear();
        const token = this.session.getFromKeyToObject<Connection>(
            this.tokenKey
        );
        this.updateStore(
            this.members.isClanMembers(Number(token?.account_id)),
            token?.access_token
        );
        return token != null && token?.status === 'ok';
    }

    private updateStore(
        user: Member | undefined,
        accesToken: string | undefined
    ): void {
        this.memberStore.patch({
            account_id: user?.account_id,
            isAdmin: CheckGrade.isAdmin(user?.role),
            isVisitor: user ? false : true,
            accesToken: accesToken,
        });
    }
}
