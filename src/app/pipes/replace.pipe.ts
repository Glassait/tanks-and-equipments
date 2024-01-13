import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replace',
    standalone: true,
})
export class ReplacePipe implements PipeTransform {
    transform(value: string, ...args: string[]): string {
        return value.replace(new RegExp(args[0], 'g'), args[1]);
    }
}
