import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'image',
})
export class ImagePipe implements PipeTransform {
    transform(
        value: string,
        type?: 'equipments' | 'shells' | 'skills' | 'tanks' | 'consumables' | 'fields',
        format?: 'png' | 'avif',
        isPrem?: boolean
    ): string {
        if (type && format) {
            return `assets/${type}/${isPrem ? 'prem-' : ''}${this.replaceValue(value)}.${format}`;
        }
        return this.replaceValue(value);
    }

    private replaceValue(value: string) {
        return value.toLowerCase().replace(/ /g, '_').replace(/\//g, '_');
    }
}
