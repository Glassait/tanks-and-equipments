import { Pipe, PipeTransform } from '@angular/core';
import { InformationService } from 'src/app/commons/services/information.service';

@Pipe({
    name: 'getUrl',
})
export class UrlPipe implements PipeTransform {
    transform(value: InformationService, ...args: unknown[]) {
        return value.getURL();
    }
}
