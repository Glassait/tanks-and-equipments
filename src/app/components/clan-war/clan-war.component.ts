import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';

@Component({
    selector: 'app-clan-war',
    templateUrl: './clan-war.component.html',
})
export class ClanWarComponent {
    constructor(
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private router: Router
    ) {
        if (memberStore.isVisitor()) {
            router.navigate(['/']);
        }

        headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: false,
        });
    }
}
