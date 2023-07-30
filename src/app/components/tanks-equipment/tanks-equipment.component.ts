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
        if (memberStore.isVisitor()) {
            router.navigate(['/']);
        }

        headerStore.patch({
            showHome: true,
            showTank: false,
            showWar: true,
        });
    }
}
