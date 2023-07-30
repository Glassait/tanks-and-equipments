import { Component } from '@angular/core';
import { TanksDataService } from 'src/app/commons/services/tank-data.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent {
    constructor(
        private headerStore: HeaderStore,
        protected tanksData: TanksDataService
    ) {
        headerStore.patch({
            showHome: true,
            showTank: false,
            showWar: true,
        });
    }
}
