import { Component, OnInit } from '@angular/core';
import {
    WotApiService,
    WotClanRatingsRequest,
    WotServerRequest,
} from 'src/app/commons/class/wotApi.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { WordingClass } from 'src/app/commons/class/wording.class';
import { InformationClass } from 'src/app/commons/class/information.class';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    protected showSpinnerServer = true;
    protected showSpinnerClanRatings = true;
    protected showClanRatingsCard = true;
    protected wotServer!: WotServerRequest;
    protected wotClanRatings!: WotClanRatingsRequest;

    constructor(
        private wotApiService: WotApiService,
        protected wordingClass: WordingClass,
        protected informationClass: InformationClass,
        private headerStore: HeaderStore
    ) {
        this.setHeaderVariables();
    }

    ngOnInit(): void {
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
            window.getComputedStyle(clanRatingsCard).display !== 'none'
        );
    }

    private getWotServerStatus() {
        this.wotApiService.getServeurStatus().subscribe({
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
        this.wotApiService.getClanRatings().subscribe({
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

    private setHeaderVariables() {
        this.headerStore.set('showHome', false);
        this.headerStore.set('showTank', true);
        this.headerStore.set('showWar', true);
    }
}
