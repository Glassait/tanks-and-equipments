import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryClass } from './inventory.class';

@Injectable({
    providedIn: 'root',
})
export class WotApiService {
    constructor(
        private httpClient: HttpClient,
        private inventory: InventoryClass
    ) {}

    getServeurStatus(): Observable<any> {
        if (environment.production) {
            return this.httpClient.get(
                this.inventory.getWargammingApi().gameServers
            );
        }
        return this.httpClient.get(
            this.inventory.getWargammingApi().gameServersMock
        );
    }

    getClanRatings(): Observable<any> {
        if (environment.production) {
            return this.httpClient.get(
                this.inventory.getWargammingApi().clanRatings
            );
        }
        return this.httpClient.get(
            this.inventory.getWargammingApi().clanRatingsMock
        );
    }
}

export type WotServerRequest = {
    status: string;
    data: {
        wot: { players_online: number; server: string }[];
    };
};

export type ClanRatings = {
    rank_delta: null | number;
    rank: null | number;
    value: number;
};

export type WotClanRatingsRequest = {
    status: string;
    meta: { count: number };
    data: {
        500179430: {
            gm_elo_rating_10: ClanRatings;
            gm_elo_rating_8: ClanRatings;
            fb_elo_rating_8: ClanRatings;
            fb_elo_rating_6: ClanRatings;
            exclude_reasons: {
                gm_elo_rating_8: string;
                gm_elo_rating: string;
                gm_elo_rating_6: string;
                gm_elo_rating_10: string;
            };
            efficiency: ClanRatings;
            rating_fort: ClanRatings;
            fb_elo_rating_10: ClanRatings;
            clan_tag: string;
            battles_count_avg_daily: ClanRatings;
            global_rating_weighted_avg: ClanRatings;
            clan_id: number;
            fb_elo_rating: ClanRatings;
            gm_elo_rating_6: ClanRatings;
            wins_ratio_avg: ClanRatings;
            clan_name: string;
            gm_elo_rating: ClanRatings;
            battles_count_avg: ClanRatings;
            v10l_avg: ClanRatings;
            global_rating_avg: ClanRatings;
        };
    };
};
