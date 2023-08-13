import { Pipe, PipeTransform } from '@angular/core';
import { WordingService } from '../../commons/services/wording.service';

@Pipe({
    name: 'getAgreement',
})
export class AgreementPipe implements PipeTransform {
    transform(wordingService: WordingService, ...args: unknown[]) {
        return wordingService.agreement;
    }
}
