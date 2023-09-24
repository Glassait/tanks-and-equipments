import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'image',
})
export class ImagePipe implements PipeTransform {
    transform(value: string): string {
        return value.toLowerCase().replace(/ /g, '_').replace(/\//g, '_');
    }
}
