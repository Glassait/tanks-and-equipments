import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toString',
})
export class ToStringPipe implements PipeTransform {
    transform(value?: number): string {
        if (!value) {
            return '';
        }

        return value.toString();
    }
}
