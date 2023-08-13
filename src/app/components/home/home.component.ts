import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ArrayCustom } from 'src/app/commons/classes/array-custom.class';
import { WindowsCustom } from 'src/app/commons/classes/windows-custom.class';
import { MemberInterface } from 'src/app/commons/interfaces/member.interface';
import { InformationService } from 'src/app/commons/services/information.service';
import { WordingService } from 'src/app/commons/services/wording.service';
import { WotApiService } from 'src/app/commons/services/wot-api.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import {
    WotClanRatingsRequest,
    WotServerRequest,
} from 'src/app/commons/types/clan-ratings.type';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { FooterStore } from '../../commons/stores/footer.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { SentenceCasePipe } from '../../pipes/sentenceCase/sentence-case.pipe';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
    protected showSpinnerServer: boolean = true;
    protected showSpinnerClanRatings: boolean = true;
    protected showClanRatingsCard: boolean = true;
    protected wotServer: WotServerRequest;
    protected wotClanRatings: WotClanRatingsRequest;
    protected isVisitor: boolean;
    protected isDarkMode: boolean;

    private memberSubscribe: Subscription;
    private modeSubscribe: Subscription;
    private cookieName = {
        serverStatus: 'serverStatus',
        clanRatings: 'clanRatings',
    };

    constructor(
        protected wording: WordingService,
        protected information: InformationService,
        private memberStore: MemberStore,
        private headerStore: HeaderStore,
        private modeStore: ModeStore,
        private footerStore: FooterStore,
        private wotApi: WotApiService,
        private cookie: CookieService,
        private title: Title
    ) {
        this.patchHeaderAndFooter();

        this.title.setTitle(
            new SentenceCasePipe().transform(this.wording.header.accueil)
        );
    }

    ngOnInit(): void {
        this.getWotServerStatus();

        if (
            this.isClanRatingsCardDisplayed(
                document.querySelector('#right-home')
            )
        ) {
            this.getClanRatings();
        } else {
            this.showSpinnerClanRatings = false;
            this.showClanRatingsCard = false;
        }

        this.createSubscribe();
    }

    ngOnDestroy(): void {
        this.memberSubscribe.unsubscribe();
        this.modeSubscribe.unsubscribe();
    }

    private patchHeaderAndFooter(): void {
        this.headerStore.patch({
            showHome: false,
            showTank: true,
            showWar: true,
        });

        this.footerStore.patch({
            showChangelog: true,
            showAgreement: true,
        });
    }

    private createSubscribe(): void {
        this.memberSubscribe = this.memberStore
            .watch()
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
            });

        this.modeSubscribe = this.modeStore
            .watch()
            .subscribe((value: ModeInterface): void => {
                this.isDarkMode = value.dark;
            });
    }

    private isClanRatingsCardDisplayed(
        clanRatingsCard: Element | null
    ): boolean {
        return (
            clanRatingsCard !== null &&
            WindowsCustom.getDisplay(clanRatingsCard) !== 'none'
        );
    }

    private getWotServerStatus(): void {
        const cookie: string = this.cookie.get(this.cookieName.serverStatus);
        if (cookie) {
            this.wotServer = JSON.parse(cookie);
            this.showSpinnerServer = false;
            return;
        }

        this.wotApi.getServeurStatus().subscribe({
            next: (serverRequest: WotServerRequest): void => {
                this.wotServer = serverRequest;
                this.wotServer.data.wot =
                    ArrayCustom.sortArrayOfObjectFromNumberDecroissant(
                        serverRequest.data.wot,
                        'players_online'
                    );
            },
            error(err): void {
                console.log(err);
            },
            complete: (): void => {
                this.cookie.set(
                    this.cookieName.serverStatus,
                    JSON.stringify(this.wotServer),
                    this.getTodayDatePlusTenMinute()
                );
                this.showSpinnerServer = false;
            },
        });
    }

    private getClanRatings(): void {
        const cookie: string = this.cookie.get(this.cookieName.clanRatings);
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
                    this.cookieName.clanRatings,
                    JSON.stringify(this.wotClanRatings),
                    this.getTodayDatePlusTenMinute()
                );
                this.showSpinnerClanRatings = false;
            },
        });
    }

    private getTodayDatePlusTenMinute(): Date {
        const today: Date = new Date();
        today.setMinutes(today.getMinutes() + 10);
        return today;
    }
}
