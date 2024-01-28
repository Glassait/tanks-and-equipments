import { Connection } from '../types/connection.type';
import { MemberDto } from '../../../generated-api/members';

export interface MemberInterface {
    user?: MemberDto;
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
