import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArrayCustom } from 'src/app/commons/classes/array-custom.class';
import { WindowsCustom } from 'src/app/commons/classes/windows-custom.class';
import { MemberInterface } from 'src/app/commons/interfaces/member.interface';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { InformationService } from 'src/app/commons/services/information.service';
import { WordingService } from 'src/app/commons/services/wording.service';
import { WotApiService } from 'src/app/commons/services/wot-api.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import {
    WotClanRatingsRequest,
    WotServerRequest,
} from 'src/app/commons/types/clan-ratings.type';

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

    private memberSubscribe: Subscription;

    constructor(
        protected wording: WordingService,
        protected information: InformationService,
        private memberStore: MemberStore,
        private headerStore: HeaderStore,
        private wotApi: WotApiService,
        private auth: AuthenticationService
    ) {
        this.patchHeader();
    }

    ngOnInit(): void {
        if (!this.auth.isLoggedIn()) {
            this.auth.login();
        }

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
    }

    private patchHeader(): void {
        this.headerStore.patch({
            showHome: false,
            showTank: true,
            showWar: true,
        });
    }

    private createSubscribe(): void {
        this.memberSubscribe = this.memberStore
            .watch()
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
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
                this.showSpinnerServer = false;
            },
        });
    }

    private getClanRatings(): void {
        this.wotApi.getClanRatings().subscribe({
            next: (clanRatingsRequest: WotClanRatingsRequest): void => {
                this.wotClanRatings = clanRatingsRequest;
            },
            error(err): void {
                console.log(err);
            },
            complete: (): void => {
                this.showSpinnerClanRatings = false;
            },
        });
    }
}
