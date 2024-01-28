import { SelectOptionType } from '../../../components/select/types/select-option.type';
import { ClanReserveEnum } from '../enums/clan-reserve.enum';
import { Duration } from 'moment';
import { ClanReserveDataInner, ClanReserveDataInnerInStockInner } from '../../../../generated-api/glassait/stronghold';

export type ClanReserveType = {
    type: ClanReserveDataInner['type'];
    name: ClanReserveDataInner['name'];
    bonus_type: ClanReserveDataInner['bonus_type'];
    active_till?: Date;
    duration?: ClanReserveDataInnerInStockInner['action_time'];
    options: SelectOptionType[];
    link_to: ClanReserveEnum;
    clock?: Duration;
};
