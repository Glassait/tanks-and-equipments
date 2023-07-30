import { Component } from '@angular/core';
import { WotApiService } from 'src/app/commons/services/wot-api.service';

@Component({
    selector: 'app-clan-members',
    templateUrl: './clan-members.component.html',
})
export class ClanMembersComponent {
    constructor(
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
