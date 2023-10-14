import { Pipe, PipeTransform } from '@angular/core';
import { InventoryService } from 'src/app/commons/services/inventory.service';

@Pipe({
    name: 'inventory',
})
export class InventoryPipe implements PipeTransform {
    constructor(private inventory: InventoryService) {}

    transform(path: string, ..._args: string[]): string {
        return this.inventory.getInventoryFromString(path);
    }
}
