import { Component, Input } from '@angular/core';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { HeaderInterface } from 'src/app/commons/interfaces/header.interface';
import { WordingClass } from 'src/app/commons/class/wording.class';
import { InventoryClass } from 'src/app/commons/class/inventory.class';
import { MemberStore } from 'src/app/commons/stores/member.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    protected showHome: boolean;
    protected showTank: boolean;
    protected showWar: boolean;

    constructor(
        private headerStore: HeaderStore,
        protected memberStore: MemberStore,
        protected wordingClass: WordingClass,
        protected inventoryClass: InventoryClass
    ) {
        this.watchStore();
    }

    private watchStore() {
        this.headerStore.watch().subscribe((value: HeaderInterface) => {
            this.showHome = value.showHome;
            this.showTank = value.showTank;
            this.showWar = value.showWar;
        });
    }
}
