import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'value',
    standalone: true,
})
export class ObjectPipe implements PipeTransform {
    transform(value: string, object: any): string {
        return object[value];
    }
}
