import { Pipe, PipeTransform } from '@angular/core';
import { WordingService } from 'src/app/commons/services/wording.service';

@Pipe({
    name: 'getHeader',
})
export class HeaderPipe implements PipeTransform {
    transform(value: WordingService, ...args: string[]) {
        return value.getHeader();
    }
}
