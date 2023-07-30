import { Component, OnInit } from '@angular/core';
import { WotApiService } from 'src/app/commons/services/wot-api.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { WordingService } from 'src/app/commons/services/wording.service';
import { InformationService } from 'src/app/commons/services/information.service';
import {
    WotClanRatingsRequest,
    WotServerRequest,
} from 'src/app/commons/types/clan-ratings.type';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { WindowsCustom } from 'src/app/commons/classes/windows-custom.class';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    protected showSpinnerServer = true;
    protected showSpinnerClanRatings = true;
    protected showClanRatingsCard = true;
    protected wotServer: WotServerRequest;
    protected wotClanRatings: WotClanRatingsRequest;

    constructor(
        private wotApi: WotApiService,
        protected wording: WordingService,
        protected information: InformationService,
        private headerStore: HeaderStore,
        protected memberStore: MemberStore,
        private auth: AuthenticationService
    ) {
        this.headerStore.patch({
            showHome: false,
            showTank: true,
            showWar: true,
        });
    }

    ngOnInit(): void {
        if (!this.auth.isLoggedIn()) {
            this.auth.login();
        }

        this.getWotServerStatus();

        if (
            this.isClanRatingsCardDisplayed(
                document.querySelector('#rightHome')
            )
        ) {
            this.getClanRatings();
        } else {
            this.showSpinnerClanRatings = false;
            this.showClanRatingsCard = false;
        }
    }

    private isClanRatingsCardDisplayed(clanRatingsCard: Element | null) {
        return (
            clanRatingsCard !== null &&
            WindowsCustom.getDisplay(clanRatingsCard) !== 'none'
        );
    }

    private getWotServerStatus() {
        this.wotApi.getServeurStatus().subscribe({
            next: (reponse: WotServerRequest) => {
                this.wotServer = reponse;
            },
            error(err) {
                console.log(err);
            },
            complete: () => {
                this.showSpinnerServer = false;
            },
        });
    }

    private getClanRatings() {
        this.wotApi.getClanRatings().subscribe({
            next: (reponse: WotClanRatingsRequest) => {
                this.wotClanRatings = reponse;
            },
            error(err) {
                console.log(err);
            },
            complete: () => {
                this.showSpinnerClanRatings = false;
            },
        });
    }
}
