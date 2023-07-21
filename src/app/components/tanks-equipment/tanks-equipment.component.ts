import { Component } from '@angular/core';
import { TanksDataClass } from 'src/app/commons/class/tankData.class';
import { HeaderStore } from 'src/app/commons/stores/header.store';

@Component({
    selector: 'app-tanks-equipment',
    templateUrl: './tanks-equipment.component.html',
})
export class TanksEquipmentComponent {
    constructor(
        private headerStore: HeaderStore,
        protected tanksDataClass: TanksDataClass
    ) {
        this.setHeaderVariables();
    }

    private setHeaderVariables() {
        this.headerStore.set('showHome', true);
        this.headerStore.set('showTank', false);
        this.headerStore.set('showWar', true);
    }
}
