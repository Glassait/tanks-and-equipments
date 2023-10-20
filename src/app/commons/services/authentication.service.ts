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
                this.cookieService.set(
                    CookieNameEnum.TOKEN_WARGAMING,
                    JSON.stringify(token),
                    DateCustom.getMidnightDate()
                );
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

        if (!token && !user) {
            this.memberStore.set('isVisitor', true);
            return false;
        }

        this.updateStore(JSON.parse(user) ?? undefined, JSON.parse(token)?.access_token);
        return true;
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
