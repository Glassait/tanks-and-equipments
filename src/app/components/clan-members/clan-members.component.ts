import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WotApiService } from 'src/app/commons/services/wot-api.service';
import { MemberStore } from 'src/app/commons/stores/member.store';

@Component({
    selector: 'app-clan-members',
    templateUrl: './clan-members.component.html',
})
export class ClanMembersComponent {
    constructor(
        private wotApiService: WotApiService,
        private memberStore: MemberStore,
        private router: Router
    ) {
        if (memberStore.isVisitor() || !memberStore.isAdmin()) {
            router.navigate(['/']);
        }

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
