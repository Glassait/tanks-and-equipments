import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil, takeWhile } from 'rxjs';
import { InformationApi } from '../../commons/api/information.api';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { CookieNameEnum } from '../../commons/enums/cookie-name.enum';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { InventoryService } from '../../commons/services/inventory.service';
import { WordingService } from '../../commons/services/wording.service';
import { WotService } from '../../commons/services/wot.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { MemberStore } from '../../commons/stores/member.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { WotServerRequest } from '../../commons/types/clan-ratings.type';
import { InformationType } from '../../commons/types/information.type';
import { DateCustom } from '../../commons/utils/date.custom';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent extends UnsubscribeDirective implements OnInit {
    /**
     * Define the mode of the site (light or dark)
     * @protected
     */
    protected mode: ModeEnum;
    /**
     * Store the result of the api call to get the information of the clan
     * @protected
     */
    protected information: { isLoading: boolean; isError: boolean; information?: InformationType } =
        {
            isLoading: true,
            isError: false,
        };
    /**
     * Store the result of the api call to get the information about the wot's server
     * @protected
     */
    protected wotServer: {
        isLoading: boolean;
        isError: boolean;
        servers?: WotServerRequest;
        max?: number;
    } = {
        isLoading: true,
        isError: false,
    };
    /**
     * Define if the user is a visitor or not
     * @protected
     */
    protected isVisitor: boolean;

    /**
     * ENUM
     * @protected
     */
    protected readonly ModeEnum = ModeEnum;
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;

    constructor(
        // STORE
        private headerStore: HeaderStore,
        private modeStore: ModeStore,
        private memberStore: MemberStore,
        // API
        private informationApi: InformationApi,
        // SERVICE
        private cookie: CookieService,
        private wotService: WotService,
        private inventoryService: InventoryService,
        private wording: WordingService,
        // ANGULAR
        private router: Router,
        private title: Title,
        // PIPE
        private sentenceCasePipe: SentenceCasePipe
    ) {
        super();
    }

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.title.setTitle(this.sentenceCasePipe.transform(this.wording.header.home));

        this.headerStore.patch({
            showHome: false,
            showWar: true,
            showTank: true,
        });

        this.createSubscription();

        this.getInformation();
        this.getWotServerStatus();
    }

    protected navigate = (path: string | undefined): void => {
        if (!path) {
            return;
        }

        if (path.indexOf('https') >= 0) {
            window.location.href = path;
        } else {
            this.router
                .navigate([this.inventoryService.getInventoryFromString(path)])
                .then((value: boolean): void => {
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
        const cookie: string = this.cookie.get(CookieNameEnum.INFORMATION);
        if (cookie) {
            this.information.information = JSON.parse(cookie);
            this.information.isLoading = false;
            return;
        }

        this.informationApi.queryInformation().subscribe({
            next: (value: InformationType): void => {
                this.information.information = value;
            },
            error: _err => {
                this.information.isError = true;
                this.information.isLoading = false;
            },
            complete: (): void => {
                this.cookie.set(
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
        const cookie: string = this.cookie.get(CookieNameEnum.SERVER_STATUS);
        const cookieMax: string = this.cookie.get(CookieNameEnum.SERVER_STATUS_MAX);
        if (cookie) {
            this.wotServer.servers = JSON.parse(cookie);
            this.wotServer.max = JSON.parse(cookieMax);
            this.wotServer.isLoading = false;
            return;
        }

        this.wotService.getServeurStatus().subscribe({
            next: (serverRequest: WotServerRequest): void => {
                this.wotServer.servers = serverRequest;
                this.wotServer.servers.data.wot.forEach((server: any): void => {
                    server.server = server.server.replace('20', 'EU');
                });
                this.wotServer.servers.data.wot.sort((a: any, b: any) =>
                    a.server.localeCompare(b.server)
                );
                this.wotServer.max = Math.max(
                    ...this.wotServer.servers.data.wot.map((value: any) => value.players_online)
                );
            },
            error: _err => {
                this.wotServer.isError = true;
                this.wotServer.isLoading = false;
            },
            complete: (): void => {
                this.cookie.set(
                    CookieNameEnum.SERVER_STATUS,
                    JSON.stringify(this.wotServer.servers),
                    DateCustom.getTodayDatePlusTenMinute()
                );
                this.cookie.set(
                    CookieNameEnum.SERVER_STATUS_MAX,
                    JSON.stringify(this.wotServer.max),
                    DateCustom.getTodayDatePlusTenMinute()
                );
                this.wotServer.isLoading = false;
            },
        });
    }

    /**
     * Create all subscription to get the metadata of the sire
     * @private
     */
    private createSubscription(): void {
        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: ModeInterface): void => {
                this.mode = value.color;
            });

        this.memberStore
            .watch()
            .pipe(takeWhile((value: MemberInterface) => value !== null && value !== undefined))
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
            });
    }
}
