import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs';
import { MemberInterface } from 'src/app/commons/interfaces/member.interface';
import { InformationService } from 'src/app/commons/services/information.service';
import { WordingService } from 'src/app/commons/services/wording.service';
import { WotApiService } from 'src/app/commons/services/wot-api.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { WotClanRatingsRequest, WotServerRequest } from 'src/app/commons/types/clan-ratings.type';
import { ArrayCustom } from 'src/app/commons/utils/array-custom.util';
import { WindowsCustom } from 'src/app/commons/utils/windows-custom.util';
import { UnsubscribeComponent } from '../../commons/directives/unsubscribe.component';
import { CookieNameEnum } from '../../commons/enums/cookie-name.enum';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { FooterStore } from '../../commons/stores/footer.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { InformationType } from '../../commons/types/information.type';
import { DateCustom } from '../../commons/utils/date.custom';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';
import { IconColorEnum } from '../icon/enums/icon-enum';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent extends UnsubscribeComponent implements OnInit {
    protected showSpinnerServer: boolean = true;
    protected showSpinnerClanRatings: boolean = true;
    protected showSpinnerInformationCard: boolean = true;
    protected showClanRatingsCard: boolean = true;

    protected wotServer: WotServerRequest;
    protected wotClanRatings: WotClanRatingsRequest;
    protected information: InformationType;

    protected isVisitor: boolean;
    protected isDarkMode: boolean;

    protected readonly IconColorEnum = IconColorEnum;

    constructor(
        protected wording: WordingService,
        protected informationService: InformationService,
        private memberStore: MemberStore,
        private headerStore: HeaderStore,
        private modeStore: ModeStore,
        private footerStore: FooterStore,
        private wotApi: WotApiService,
        private cookie: CookieService,
        private title: Title
    ) {
        super();
        this.patchHeaderAndFooter();

        this.title.setTitle(new SentenceCasePipe().transform(this.wording.header.accueil));
    }

    ngOnInit(): void {
        this.getWotServerStatus();
        this.getInformation();

        if (this.isClanRatingsCardDisplayed(document.querySelector('#right-home'))) {
            this.getClanRatings();
        } else {
            this.showSpinnerClanRatings = false;
            this.showClanRatingsCard = false;
        }

        this.createSubscribe();
    }

    private patchHeaderAndFooter(): void {
        this.headerStore.patch({
            showHome: false,
            showTank: true,
            showWar: !this.modeStore.get('mobile'),
        });

        this.footerStore.patch({
            showChangelog: true,
            showAgreement: true,
        });
    }

    private createSubscribe(): void {
        this.memberStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
            });

        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: ModeInterface): void => {
                this.isDarkMode = value.color === ModeEnum.DARK;
            });
    }

    private isClanRatingsCardDisplayed(clanRatingsCard: Element | null): boolean {
        return clanRatingsCard !== null && WindowsCustom.getDisplay(clanRatingsCard) !== 'none';
    }

    private getWotServerStatus(): void {
        const cookie: string = this.cookie.get(CookieNameEnum.SERVER_STATUS);
        if (cookie) {
            this.wotServer = JSON.parse(cookie);
            this.showSpinnerServer = false;
            return;
        }

        this.wotApi.getServeurStatus().subscribe({
            next: (serverRequest: WotServerRequest): void => {
                this.wotServer = serverRequest;
                this.wotServer.data.wot = ArrayCustom.sortArrayOfObjectFromNumberDecroissant(
                    serverRequest.data.wot,
                    'players_online'
                );
            },
            error(err): void {
                console.log(err);
            },
            complete: (): void => {
                this.cookie.set(
                    CookieNameEnum.SERVER_STATUS,
                    JSON.stringify(this.wotServer),
                    DateCustom.getTodayDatePlusTenMinute()
                );
                this.showSpinnerServer = false;
            },
        });
    }

    private getClanRatings(): void {
        const cookie: string = this.cookie.get(CookieNameEnum.CLAN_RATINGS);
        if (cookie) {
            this.wotClanRatings = JSON.parse(cookie);
            this.showSpinnerClanRatings = false;
            return;
        }

        this.wotApi.getClanRatings().subscribe({
            next: (clanRatingsRequest: WotClanRatingsRequest): void => {
                this.wotClanRatings = clanRatingsRequest;
            },
            error(err): void {
                console.log(err);
            },
            complete: (): void => {
                this.cookie.set(
                    CookieNameEnum.CLAN_RATINGS,
                    JSON.stringify(this.wotClanRatings),
                    DateCustom.getTodayDatePlusTenMinute()
                );
                this.showSpinnerClanRatings = false;
            },
        });
    }

    private getInformation(): void {
        const cookie: string = this.cookie.get(CookieNameEnum.INFORMATION);
        if (cookie) {
            this.information = JSON.parse(cookie);
            this.showSpinnerInformationCard = false;
            return;
        }

        this.informationService.queryInformation().subscribe({
            next: (value: InformationType): void => {
                this.information = value;
            },
            error: err => {
                console.log(err);
            },
            complete: (): void => {
                this.cookie.set(
                    CookieNameEnum.INFORMATION,
                    JSON.stringify(this.information),
                    DateCustom.getMidnightDate()
                );
                this.showSpinnerInformationCard = false;
            },
        });
    }
}
