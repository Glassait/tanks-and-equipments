import { Pipe, PipeTransform } from '@angular/core';
import { FieldComposant } from 'src/app/commons/types/tanks-data.type';

@Pipe({
    name: 'getFieldUrl',
})
export class FieldUrlPipe implements PipeTransform {
    transform(value: FieldComposant, ...args: unknown[]): string {
        return `/assets/fields/${value.image}${value.active ? '' : '.disabled'}.${args[0]}`;
    }
}
