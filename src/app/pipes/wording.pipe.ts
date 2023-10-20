import { Pipe, PipeTransform } from '@angular/core';
import { WordingService } from 'src/app/commons/services/wording.service';

@Pipe({
    name: 'wording',
})
export class WordingPipe implements PipeTransform {
    constructor(private wording: WordingService) {}

    transform(path: string, ..._args: string[]): string {
        return this.wording.getWordingFromString(path);
    }
}
