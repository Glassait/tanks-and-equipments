import { Pipe, PipeTransform } from '@angular/core';
import { InformationService } from 'src/app/commons/services/information.service';

@Pipe({
    name: 'getText',
})
export class TextPipe implements PipeTransform {
    transform(value: InformationService, ...args: unknown[]) {
        return value.getText();
    }
}
