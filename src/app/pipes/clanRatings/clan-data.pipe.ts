import { Pipe, PipeTransform } from '@angular/core';
import { WotClanRatingsRequest } from 'src/app/commons/types/clan-ratings.type';

@Pipe({
    name: 'getClanData',
})
export class ClanDataPipe implements PipeTransform {
    transform(value: WotClanRatingsRequest, ...args: unknown[]) {
        return value.data[500179430];
    }
}
