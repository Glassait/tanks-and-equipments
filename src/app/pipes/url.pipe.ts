import { Pipe, PipeTransform } from '@angular/core';
import { FieldDetail } from '../../generated-api/tanks';

@Pipe({
    name: 'getFieldUrl',
    standalone: true,
})
export class FieldUrlPipe implements PipeTransform {
    transform(value: FieldDetail, ...args: unknown[]): string {
        return `/assets/fields/${value.image}${value.active ? '' : '.disabled'}.${args[0]}`;
    }
}
