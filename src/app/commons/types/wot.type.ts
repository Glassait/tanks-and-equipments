export type DefaultWargaming<Data> = {
    status: string;
    meta: {
        count: number;
    };
    data: Data;
};

export type WotServer = {
    wot: { players_online: number; server: string }[];
};

export type MemberOnline = {
    '500179430': {
        private: {
            online_members: number[];
        };
    };
};
