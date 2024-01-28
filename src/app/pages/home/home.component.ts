import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { CookieNameEnum } from '../../commons/enums/cookie-name.enum';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { InventoryService } from '../../commons/services/inventory.service';
import { WordingService } from '../../commons/services/wording.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { DefaultHttpType } from '../../commons/types/default-httpType';
import { DateCustom } from '../../commons/utils/date.custom';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { MemberStore } from '../../commons/stores/member.store';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { takeWhile } from 'rxjs';
import { ClansService, OnlineMemberResponse } from '../../../generated-api/clans';
import { ServerInfoData, ServerResponse, WgnService, WotServer } from '../../../generated-api/wgn';
import { InformationDto, InformationService } from '../../../generated-api/information';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    //region ENUM
    protected readonly ModeEnum = ModeEnum;
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;
    //endregion

    //region PRIVATE READONLY FIELD
    /**
     * The initial state of the http field
     * @private
     */
    private readonly initial: DefaultHttpType = {
        isLoading: true,
        isError: false,
    };
    //endregion

    //region PROTECTED FIELD
    /**
     * Store the result of the api call to get the information of the clan
     * @protected
     */
    protected information: DefaultHttpType & { information?: InformationDto } = this.initial;
    /**
     * Store the result of the api call to get the information about the wot's server
     * @protected
     */
    protected wotServer: DefaultHttpType & {
        servers?: ServerInfoData;
        max?: number;
    } = this.initial;
    /**
     * Store the result of the api call to get the number of member online
     * @protected
     */
    protected memberOnline: DefaultHttpType & {
        amount?: number;
    } = this.initial;

    //endregion

    constructor(
        // STORE
        private readonly headerStore: HeaderStore,
        private readonly memberStore: MemberStore,
        // API
        private readonly informationService: InformationService,
        private readonly wngService: WgnService,
        private readonly clansService: ClansService,
        // SERVICE
        private readonly cookieService: CookieService,
        private readonly inventory: InventoryService,
        private readonly wording: WordingService,
        protected readonly member: MemberService,
        protected readonly mode: ModeService,
        // ANGULAR
        private readonly router: Router,
        private readonly title: Title,
        // PIPE
        private readonly sentenceCasePipe: SentenceCasePipe
    ) {}

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.title.setTitle(this.sentenceCasePipe.transform(this.wording.header.home));

        this.headerStore.patch({
            showHome: false,
            showWar: true,
            showTank: true,
            showAdmin: true,
        });

        this.memberStore
            .watch()
            .pipe(takeWhile((member: MemberInterface) => member.isVisitor, true))
            .subscribe((member: MemberInterface): void => {
                if (!member.isVisitor) {
                    this.getInformation();
                    this.getMemberOnline();
                }
            });

        this.getWotServerStatus();
    }

    /**
     * The callback for the action in the card
     * @param path The path to redirect
     */
    protected navigate = (path: string | undefined): void => {
        if (!path) {
            return;
        }

        if (path.indexOf('https') >= 0) {
            window.location.href = path;
        } else {
            this.router.navigate([this.inventory.getInventoryFromString(path)]).then((value: boolean): void => {
                if (value) {
                    window.scrollTo(0, 0);
                }
            });
        }
    };

    /**
     * Get the information of the clan from the api or the cookie
     * @private
     */
    private getInformation(): void {
        const cookie: string = this.cookieService.get(CookieNameEnum.INFORMATION);
        if (cookie) {
            this.information.information = JSON.parse(cookie);
            this.information.isLoading = false;
            return;
        }

        this.informationService.informations(this.member.accessToken).subscribe({
            next: (value: InformationDto): void => {
                this.information.information = value;
            },
            error: _err => {
                this.information.isError = true;
                this.information.isLoading = false;
            },
            complete: (): void => {
                this.cookieService.set(
                    CookieNameEnum.INFORMATION,
                    JSON.stringify(this.information.information),
                    DateCustom.getMidnightDate()
                );
                this.information.isLoading = false;
            },
        });
    }

    /**
     * Get the wot's server status
     * @private
     */
    private getWotServerStatus(): void {
        const cookie: string = this.cookieService.get(CookieNameEnum.SERVER_STATUS);
        const cookieMax: string = this.cookieService.get(CookieNameEnum.SERVER_STATUS_MAX);
        if (cookie && cookieMax) {
            this.wotServer.servers = JSON.parse(cookie);
            this.wotServer.max = JSON.parse(cookieMax);
            this.wotServer.isLoading = false;
            return;
        }

        this.wngService.serverInfo(this.inventory.applicationId, 'fr').subscribe({
            next: (response: ServerResponse): void => {
                if (response.status === 'error') {
                    this.wotServer.isError = true;
                    this.wotServer.isLoading = false;
                    return;
                }

                this.wotServer.servers = response.data;
                this.wotServer.servers.wot.forEach((server: WotServer): void => {
                    server.server = server.server.replace('20', 'EU');
                });
                this.wotServer.servers.wot.sort((a: WotServer, b: WotServer) => a.server.localeCompare(b.server));
                this.wotServer.max = Math.max(...this.wotServer.servers.wot.map((server: WotServer) => server.players_online));
            },
            error: _err => {
                this.wotServer.isError = true;
                this.wotServer.isLoading = false;
            },
            complete: (): void => {
                if (this.wotServer.isError) {
                    return;
                }

                this.cookieService.set(
                    CookieNameEnum.SERVER_STATUS,
                    JSON.stringify(this.wotServer.servers),
                    DateCustom.getTodayDatePlusTenMinute()
                );
                this.cookieService.set(
                    CookieNameEnum.SERVER_STATUS_MAX,
                    JSON.stringify(this.wotServer.max),
                    DateCustom.getTodayDatePlusTenMinute()
                );
                this.wotServer.isLoading = false;
            },
        });
    }

    /**
     * Get the number of member online
     * @private
     */
    private getMemberOnline(): void {
        const amount: string = this.cookieService.get(CookieNameEnum.MEMBER_ONLINE);
        if (amount) {
            this.memberOnline.amount = parseInt(JSON.parse(amount));
            this.memberOnline.isLoading = false;
            return;
        }

        this.clansService.onlineMember(this.inventory.applicationId, this.inventory.clanId, this.member.accessToken, 'fr').subscribe({
            next: (response: OnlineMemberResponse): void => {
                if (response.status === 'error') {
                    console.error(response.error);
                    this.memberOnline.isError = true;
                    this.memberOnline.isLoading = false;
                    return;
                }

                this.memberOnline.amount = response.data[this.inventory.clanId]['private'].online_members.length;
            },
            error: err => {
                console.error(err);
                this.memberOnline.isError = true;
                this.memberOnline.isLoading = false;
            },
            complete: (): void => {
                if (this.memberOnline.isError) {
                    return;
                }

                this.cookieService.set(
                    CookieNameEnum.MEMBER_ONLINE,
                    JSON.stringify(this.memberOnline.amount),
                    DateCustom.getTodayDatePlusTenMinute()
                );
                this.memberOnline.isLoading = false;
            },
        });
    }
}
