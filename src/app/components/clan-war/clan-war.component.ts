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
        this.checkUser();
        this.setHeaderVariable();
    }

    private setHeaderVariable(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: false,
        });
    }

    private checkUser(): void {
        if (this.memberStore.isVisitor()) {
            this.router.navigate(['/']).then((_r: boolean): void => {
                // Ignored
            });
        }
    }
}
