import { Pipe, PipeTransform } from '@angular/core';
import { TanksDataService } from 'src/app/commons/services/tank-data.service';

@Pipe({
    name: 'getData',
})
export class DataPipe implements PipeTransform {
    transform(value: TanksDataService, ...args: unknown[]) {
        return value.getTankDataArray();
    }
}
