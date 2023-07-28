import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'image',
})
export class ImagePipe implements PipeTransform {
    transform(value: string): string {
        return value
            .toLowerCase()
            .replace(new RegExp(' ', 'g'), '_')
            .replace(new RegExp('/', 'g'), '_');
    }
}
