import { Pipe, PipeTransform } from '@angular/core';
import { WordingService } from '../../commons/services/wording.service';

@Pipe({
    name: 'getFooter',
})
export class FooterPipe implements PipeTransform {
    transform(wordingService: WordingService, ..._args: unknown[]) {
        return wordingService.footer;
    }
}
