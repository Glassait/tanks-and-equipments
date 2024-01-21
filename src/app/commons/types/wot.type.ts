/**
 * Global type for the WoT api response
 */
export type DefaultWargaming<Data> = {
    status: string;
    meta: {
        count: number;
    };
    data: Data;
};

/**
 * Type for the WoT api response for server
 */
export type WotServer = {
    wot: { players_online: number; server: string }[];
};

/**
 * Type for the WoT api response for member online of the clan
 */
export type MemberOnline = {
    [key: string]: {
        private: {
            online_members: number[];
        };
    };
};

/**
 * Detail type for the WoT api response for the clan reserves
 */
export type Reserve = {
    status: string;
    action_time: number;
    active_till: number | null;
    level: number;
    activated_at: number | null;
    amount: number;
};

/**
 * Type for the WoT api response for the clan reserves
 */
export type ClanReserves = {
    type: string;
    in_stock: Reserve[];
    disposable: boolean;
    name: string;
    bonus_type: string;
};
