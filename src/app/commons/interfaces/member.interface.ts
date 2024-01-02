import { Member } from '../types/member.type';
import { Connection } from '../types/connection.type';

export interface MemberInterface {
    user?: Member;
    token?: Connection;
    isAdmin: boolean;
    isVisitor: boolean;
}

export const INITIAL_STATE_MEMBER: MemberInterface = {
    user: undefined,
    token: undefined,
    isAdmin: false,
    isVisitor: true,
};
