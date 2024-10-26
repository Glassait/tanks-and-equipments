import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sentenceCase',
    standalone: true,
})
export class SentenceCasePipe implements PipeTransform {
    transform(value: string): string {
        return value.at(0)?.toUpperCase() + value.slice(1);
    }
}
