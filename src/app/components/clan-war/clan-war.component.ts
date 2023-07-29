import { Component } from '@angular/core';
import { HeaderStore } from 'src/app/commons/stores/header.store';

@Component({
    selector: 'app-clan-war',
    templateUrl: './clan-war.component.html',
})
export class ClanWarComponent {
    constructor(private headerStore: HeaderStore) {
        headerStore.patch({
            showHome: true,
            showTank: true,
            showWar: false,
        });
    }
}
