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

/**
 * Service for authentication
 */
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
     * Logs in the user
     */
    public login(): void {
        let token: Connection;
        let user: Member;

        this.authenticationClient.login().subscribe({
            next: (connection: Connection): void => {
                console.log('Wot api authentication success');
                token = connection;
                user = this.membersApi.isClanMembers(Number(connection.account_id));
            },
            error: err => {
                console.error(err);
            },
            complete: (): void => {
                if (user) {
                    console.log('User found and authenticated');
                    this.cookieService.set(CookieNameEnum.TOKEN_WARGAMING, JSON.stringify(token), DateCustom.getToWeeks());
                    console.log(`Cookie ${CookieNameEnum.TOKEN_WARGAMING} created`);
                    this.cookieService.set(CookieNameEnum.TOKEN_USER, JSON.stringify(user), DateCustom.getToWeeks());
                    console.log(`Cookie ${CookieNameEnum.TOKEN_USER} created`);
                }

                this.updateStore(user, token?.access_token);
                this.router.navigate(['/']).then((): void => {});
            },
        });
    }

    /**
     * Checks if the user is logged in or not
     * If the user's data is found in the cookie, the user is automatically logged in
     */
    public isLoggedIn(): boolean {
        const token: string = this.cookieService.get(CookieNameEnum.TOKEN_WARGAMING);
        const user: string = this.cookieService.get(CookieNameEnum.TOKEN_USER);

        if (!user) {
            this.memberStore.set('isVisitor', true);

            if (token) {
                this.authenticationClient.logout(JSON.parse(token)?.access_token).subscribe({
                    complete: (): void => {
                        if (this.cookieService.check(CookieNameEnum.TOKEN_WARGAMING)) {
                            this.cookieService.delete(CookieNameEnum.TOKEN_WARGAMING);
                        }
                        if (this.cookieService.check(CookieNameEnum.TOKEN_USER)) {
                            this.cookieService.delete(CookieNameEnum.TOKEN_USER);
                        }
                    },
                });
            }
            return false;
        }

        this.updateStore(JSON.parse(user), JSON.parse(token)?.access_token);
        return true;
    }

    /**
     * Updates the member store with the data of the connected user
     * @param user The connected user
     * @param accessToken The Wargaming access token
     * @private
     */
    private updateStore(user: Member, accessToken: string | undefined): void {
        this.memberStore.patch({
            user: user,
            isAdmin: CheckGrade.isAdmin(user.role),
            isVisitor: !user,
            accessToken: accessToken,
        });
    }
}
