import { Pipe, PipeTransform } from '@angular/core';
import { InventoryService } from 'src/app/commons/services/inventory.service';

@Pipe({
    name: 'getPath',
})
export class PathPipe implements PipeTransform {
    transform(value: InventoryService, ...args: unknown[]) {
        return value.getPath();
    }
}
