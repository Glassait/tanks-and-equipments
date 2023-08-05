import { Pipe, PipeTransform } from '@angular/core';
import { InventoryService } from 'src/app/commons/services/inventory.service';

@Pipe({
    name: 'getFeatureFlipping',
})
export class FeatureFlippingPipe implements PipeTransform {
    transform(value: InventoryService, ...args: unknown[]) {
        return value.getFeatureFlipping();
    }
}
