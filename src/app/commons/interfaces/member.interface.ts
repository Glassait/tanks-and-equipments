export interface MemberInterface {
    account_id: number;
    isAdmin: boolean;
    isVisitor: boolean;
    accessToken: string;
    hasErrorOnAccessToken: boolean;
}

export const INTITIAL_STATE_MEMBER: MemberInterface = {
    account_id: undefined,
    isAdmin: false,
    isVisitor: true,
    accessToken: undefined,
    hasErrorOnAccessToken: false,
};
