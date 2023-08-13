import { Pipe, PipeTransform } from '@angular/core';
import { WordingService } from '../../commons/services/wording.service';

@Pipe({
    name: 'getChangelog',
})
export class ChangelogPipe implements PipeTransform {
    transform(wordingService: WordingService, ...args: unknown[]) {
        return wordingService.changelog;
    }
}
