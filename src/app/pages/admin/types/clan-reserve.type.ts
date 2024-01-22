import { ClanReserve, Reserve } from '../../../commons/types/wot.type';
import { SelectOptionType } from '../../../components/select/types/select-option.type';
import { ClanReserveEnum } from '../enums/clan-reserve.enum';
import { Duration } from 'moment';

export type ClanReserveType = {
    type: ClanReserve['type'];
    name: ClanReserve['name'];
    bonus_type: ClanReserve['bonus_type'];
    active_till?: Date;
    duration?: Reserve['action_time'];
    options: SelectOptionType[];
    link_to: ClanReserveEnum;
    clock?: Duration;
};
