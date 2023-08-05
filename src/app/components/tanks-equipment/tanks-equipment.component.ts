import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TanksDataService } from 'src/app/commons/services/tank-data.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent {
    constructor(
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private router: Router,
        protected tanksData: TanksDataService
    ) {
        this.checkUser();
        this.setHeaderVariable();
    }

    private checkUser(): void {
        if (this.memberStore.isVisitor()) {
            this.router.navigate(['/']).then((_r: boolean): void => {
                // Ignored
            });
        }
    }

    private setHeaderVariable(): void {
        this.headerStore.patch({
            showHome: true,
            showTank: false,
            showWar: true,
        });
    }
}
