import { Pipe, PipeTransform } from '@angular/core';
import { WordingService } from 'src/app/commons/services/wording.service';

@Pipe({
    name: 'getHome',
})
export class HomePipe implements PipeTransform {
    transform(wordingService: WordingService, ..._args: unknown[]) {
        return wordingService.home;
    }
}
