export interface MemberInterface {
    account_id: number;
    isAdmin: boolean;
    isVisitor: boolean;
    accesToken: string;
}

export const INTITIAL_STATE_MEMBER: MemberInterface = {
    account_id: 0,
    isAdmin: false,
    isVisitor: true,
    accesToken: '',
};
