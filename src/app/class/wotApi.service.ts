import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import inventory from '../../assets/json/inventory.json';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WotApiService {
    constructor(private httpClient: HttpClient) {}

    getServeurStatus(): Observable<any> {
        if (environment.production) {
            return this.httpClient.get(inventory.wargamingApi.gameServers);
        }
        return this.httpClient.get(inventory.wargamingApi.gameServersMock);
    }

    getClanRatings(): Observable<any> {
        if (environment.production) {
            return this.httpClient.get(inventory.wargamingApi.clanRatings);
        }
        return this.httpClient.get(inventory.wargamingApi.clanRatingsMock);
    }
}

export interface WotServerRequest {
    status: string;
    data: {
        wot: { players_online: number; server: string }[];
    };
}

export interface clanRatings {
    rank_delta: null | number;
    rank: null | number;
    value: number;
}

export interface WotClanRatingsRequest {
    status: string;
    meta: { count: number };
    data: {
        500179430: {
            gm_elo_rating_10: clanRatings;
            gm_elo_rating_8: clanRatings;
            fb_elo_rating_8: clanRatings;
            fb_elo_rating_6: clanRatings;
            exclude_reasons: {
                gm_elo_rating_8: string;
                gm_elo_rating: string;
                gm_elo_rating_6: string;
                gm_elo_rating_10: string;
            };
            efficiency: clanRatings;
            rating_fort: clanRatings;
            fb_elo_rating_10: clanRatings;
            clan_tag: string;
            battles_count_avg_daily: clanRatings;
            global_rating_weighted_avg: clanRatings;
            clan_id: number;
            fb_elo_rating: clanRatings;
            gm_elo_rating_6: clanRatings;
            wins_ratio_avg: clanRatings;
            clan_name: string;
            gm_elo_rating: clanRatings;
            battles_count_avg: clanRatings;
            v10l_avg: clanRatings;
            global_rating_avg: clanRatings;
        };
    };
}
