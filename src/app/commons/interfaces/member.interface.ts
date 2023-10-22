export interface MemberInterface {
    account_id: number;
    isAdmin: boolean;
    isVisitor: boolean;
    accessToken: string;
    hasErrorOnAccessToken: boolean;
}

export const INTITIAL_STATE_MEMBER: MemberInterface = {
    account_id: 0,
    isAdmin: false,
    isVisitor: true,
    accessToken: '',
    hasErrorOnAccessToken: false,
};
