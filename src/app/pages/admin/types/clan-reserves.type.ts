import { ClanReserves, Reserve } from '../../../commons/types/wot.type';
import { SelectOptionType } from '../../../components/select/types/select-option.type';
import { ClanReserveEnum } from '../enums/clan-reserve.enum';
import { Duration } from 'moment';

export type ClanReservesType = {
    type: ClanReserves['type'];
    name: ClanReserves['name'];
    bonus_type: ClanReserves['bonus_type'];
    active_till?: Date;
    duration?: Reserve['action_time'];
    options: SelectOptionType[];
    link_to: ClanReserveEnum;
    clock?: Duration;
};
