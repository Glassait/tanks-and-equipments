import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MembersApi } from '../api/members.api';
import { CookieNameEnum } from '../enums/cookie-name.enum';
import { MemberStore } from '../stores/member.store';
import { Connection } from '../types/connection.type';
import { Member } from '../types/member.type';
import { CheckGrade } from '../utils/check-grade.util';
import { DateCustom } from '../utils/date.custom';
import { AuthenticationClientService } from './authentication-client.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        // ANGULAR
        private readonly router: Router,
        // SERVICE
        private readonly authenticationClient: AuthenticationClientService,
        private readonly cookieService: CookieService,
        private readonly sessionService: SessionStorageService,
        // STORE
        private readonly memberStore: MemberStore,
        // API
        private readonly membersApi: MembersApi
    ) {}

    /**
     * Login the user
     */
    public login(): void {
        this.authenticationClient.login().subscribe((token: Connection): void => {
            const user: Member | undefined = this.membersApi.isClanMembers(
                Number(token.account_id)
            );

            this.updateStore(user, token?.access_token);

            if (user) {
                this.cookieService.set(CookieNameEnum.TOKEN_WARGAMING, JSON.stringify(token));
                this.cookieService.set(
                    CookieNameEnum.TOKEN_USER,
                    JSON.stringify(user),
                    DateCustom.getMidnightDate()
                );
            }
            this.router.navigate(['/']).then((): void => {});
        });
    }

    /**
     * Check if the user is connected of not
     * If we found the cookie, we auto connect the user
     */
    public isLoggedIn(): boolean {
        const token: string = this.cookieService.get(CookieNameEnum.TOKEN_WARGAMING);
        const user: string = this.cookieService.get(CookieNameEnum.TOKEN_USER);

        if (!user) {
            this.memberStore.set('isVisitor', true);

            if (token) {
                this.authenticationClient.logout(JSON.parse(token)?.access_token).subscribe({
                    complete: (): void => {
                        this.cookieService.delete(CookieNameEnum.TOKEN_WARGAMING);
                    },
                });
            }
            return false;
        }

        this.updateStore(JSON.parse(user) ?? undefined, JSON.parse(token)?.access_token);
        return true;
    }

    /**
     * Log out the user
     */
    public logOut(): void {
        const token: string = this.cookieService.get(CookieNameEnum.TOKEN_WARGAMING);

        if (token) {
            this.authenticationClient.logout(JSON.parse(token).access_token);
        }

        this.cookieService.deleteAll();
        this.sessionService.deleteAll();
        this.router.navigate(['/']).then((): void => {});
    }

    /**
     * Update the member store with the data of the connected user
     * @param user The connected user
     * @param accessToken The Wargaming access token
     * @private
     */
    private updateStore(user: Member | undefined, accessToken: string | undefined): void {
        this.memberStore.patch({
            account_id: user?.account_id,
            isAdmin: CheckGrade.isAdmin(user?.role),
            isVisitor: !user,
            accessToken: accessToken,
        });
    }
}
