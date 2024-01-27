import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieNameEnum } from '../enums/cookie-name.enum';
import { MemberStore } from '../stores/member.store';
import { Connection } from '../types/connection.type';
import { CheckGrade } from '../utils/check-grade.util';
import { DateCustom } from '../utils/date.custom';
import { AuthenticationClientService } from './authentication-client.service';
import { MemberDto, MembersService } from '../../../generated-api/glassait/members';

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
        private readonly membersService: MembersService
    ) {}

    /**
     * Logs in the user
     */
    public login(): void {
        let token: Connection;
        let user: MemberDto;

        this.authenticationClient.login().subscribe({
            next: (connection: Connection): void => {
                console.log('Wot api authentication success');
                token = connection;
            },
            error: err => {
                console.error(err);
            },
            complete: (): void => {
                if (token.status !== 'error') {
                    this.membersService.members(Number(token.account_id)).subscribe({
                        next: (member: MemberDto): void => {
                            user = member;
                        },
                        error: (err: any): void => {
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
            },
        });
    }

    /**
     * Checks if the user is already authenticated from the cookies
     * @returns {boolean} true if the user is authenticated, false otherwise
     */
    public loginFromCookie(): boolean {
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
    private updateStore(user: MemberDto, token: Connection): void {
        this.memberStore.patch({
            user: user,
            token: token,
            isAdmin: CheckGrade.isAdmin(user.role),
            isVisitor: !user.account_id,
        });
    }
}
