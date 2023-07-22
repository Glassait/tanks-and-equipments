import { Component } from '@angular/core';
import { InventoryClass } from 'src/app/commons/class/inventory.class';
import { WotApiService } from 'src/app/commons/service/wotApi.service';

@Component({
    selector: 'app-clan-members',
    templateUrl: './clan-members.component.html',
})
export class ClanMembersComponent {
    constructor(
        private inventoryClass: InventoryClass,
        private wotApiService: WotApiService
    ) {
        wotApiService.getMembers().subscribe({
            next: value => {
                console.log(value);
            },
            error: error => {
                console.log(error);
            },
            complete: () => {
                console.log('complete');
            },
        });
    }
}
