import { SelectOptionType } from '../../../components/select/types/select-option.type';
import { ClanReserveEnum } from '../enums/clan-reserve.enum';
import { Duration } from 'moment';
import { ClanReserveData, Reserve } from '../../../../generated-api/stronghold';

export type ClanReserveType = {
    type: ClanReserveData['type'];
    name: ClanReserveData['name'];
    bonus_type: ClanReserveData['bonus_type'];
    active_till?: Date;
    duration?: Reserve['action_time'];
    options: SelectOptionType[];
    link_to: ClanReserveEnum;
    clock?: Duration;
};
