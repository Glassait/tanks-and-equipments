import { Component, OnInit } from '@angular/core';
import {
    WotApiService,
    WotClanRatingsRequest,
    WotServerRequest,
} from 'src/app/class/wotApi.service';
import wording from '../../../assets/json/wording.json';
import information from '../../../assets/json/information.json';

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
    protected wording = wording.home;
    protected information = information;

    constructor(private wotApi: WotApiService) {}

    ngOnInit(): void {
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

        const clanRatingsCard = document.querySelector('#rightHome');
        if (
            clanRatingsCard !== null &&
            window.getComputedStyle(clanRatingsCard).display !== 'none'
        ) {
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
        } else {
            this.showSpinnerClanRatings = false;
            this.showClanRatingsCard = false;
        }
    }
}
