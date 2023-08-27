import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CheckGrade } from '../classes/check-grade.class';
import { MemberStore } from '../stores/member.store';
import { Connection } from '../types/connection.type';
import { Member } from '../types/member.type';
import { AuthenticationClientService } from './authentication-client.service';
import { MembersService } from './members.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private tokenKey: string = 'token';

    constructor(
        private authenticationClient: AuthenticationClientService,
        private router: Router,
        private memberStore: MemberStore,
        private members: MembersService,
        private session: SessionStorageService
    ) {}

    public login(): void {
        this.authenticationClient
            .login()
            .subscribe((token: Connection): void => {
                const user: Member | undefined = this.members.isClanMembers(
                    Number(token.account_id)
                );

                this.updateStore(user, token?.access_token);
                this.session.store(
                    this.tokenKey,
                    user ? JSON.stringify(token) : ''
                );
                this.router.navigate(['/']).then((): void => {
                    // Ignored
                });
            });
    }

    public isLoggedIn(): boolean {
        localStorage.clear();
        const token: Connection | null =
            this.session.getFromKeyToObject<Connection>(this.tokenKey);
        this.updateStore(
            this.members.isClanMembers(Number(token?.account_id)),
            token?.access_token
        );
        return token != null && token?.status === 'ok';
    }

    private updateStore(
        user: Member | undefined,
        accessToken: string | undefined
    ): void {
        this.memberStore.patch({
            account_id: user?.account_id,
            isAdmin: CheckGrade.isAdmin(user?.role),
            isVisitor: !user,
            accessToken: accessToken,
        });
    }
}
