export type WotServerRequest = {
    status: string;
    data: {
        wot: { players_online: number; server: string }[];
    };
};

export type ClanRatings = {
    value: number;
};

export type WotClanRatingsRequest = {
    status: string;
    meta: { count: number };
    data: {
        500179430: {
            fb_elo_rating_10: ClanRatings;
            fb_elo_rating_8: ClanRatings;
            fb_elo_rating_6: ClanRatings;
            gm_elo_rating_10: ClanRatings;
            gm_elo_rating_8: ClanRatings;
            gm_elo_rating_6: ClanRatings;
        };
    };
};
