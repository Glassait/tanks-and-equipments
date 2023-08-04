import { Pipe, PipeTransform } from '@angular/core';
import { WordingService } from 'src/app/commons/services/wording.service';

@Pipe({
    name: 'getHome',
})
export class HomePipe implements PipeTransform {
    transform(value: WordingService, ...args: unknown[]) {
        return value.getHome();
    }
}
