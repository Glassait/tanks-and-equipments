import { Pipe, PipeTransform } from '@angular/core';
import { InformationService } from 'src/app/commons/services/information.service';

@Pipe({
    name: 'getLinkText',
})
export class LinkTextPipe implements PipeTransform {
    transform(value: InformationService, ...args: unknown[]) {
        return value.getLinkText();
    }
}
