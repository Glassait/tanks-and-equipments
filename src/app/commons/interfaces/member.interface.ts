import { Member } from '../types/member.type';

export interface MemberInterface {
    user?: Member;
    isAdmin: boolean;
    isVisitor: boolean;
    accessToken: string;
}

export const INITIAL_STATE_MEMBER: MemberInterface = {
    user: undefined,
    isAdmin: false,
    isVisitor: true,
    accessToken: '',
};
