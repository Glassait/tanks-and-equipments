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

                if (connection.status !== 'error') {
                    user = this.membersApi.isClanMembers(Number(connection.account_id));
                }
            },
            error: err => {
                console.error(err);
            },
            complete: (): void => {
                if (user && token.status !== 'error') {
                    console.log('User found and authenticated');
                    this.cookieService.set(CookieNameEnum.TOKEN_WARGAMING, JSON.stringify(token), DateCustom.getToWeeks());
                    console.log(`Cookie ${CookieNameEnum.TOKEN_WARGAMING} created`);
                    this.cookieService.set(CookieNameEnum.TOKEN_USER, JSON.stringify(user), DateCustom.getToWeeks());
                    console.log(`Cookie ${CookieNameEnum.TOKEN_USER} created`);
                    this.updateStore(user, token);
                }

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
            return false;
        }

        this.updateStore(JSON.parse(user), JSON.parse(token));
        return true;
    }

    /**
     * Updates the member store with the data of the connected user
     * @param user The connected user
     * @param token The Wargaming access token
     * @private
     */
    private updateStore(user: Member, token: Connection): void {
        this.memberStore.patch({
            user: user,
            token: token,
            isAdmin: CheckGrade.isAdmin(user.role),
            isVisitor: !user.account_id,
        });
    }
}
