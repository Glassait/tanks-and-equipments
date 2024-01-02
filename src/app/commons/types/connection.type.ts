export type ConnectionFailed = {
    status: 'error';
    message: string;
    code: string;
};

export type ConnectionSuccess = {
    status: 'ok';
    access_token: string;
    nickname: string;
    account_id: string;
    expires_at: string;
};

export type Connection = ConnectionSuccess | ConnectionFailed;
