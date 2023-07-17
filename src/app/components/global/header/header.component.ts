import { Component, Input } from '@angular/core';
import wording from 'src/assets/json/wording.json';
import inventory from 'src/assets/json/inventory.json';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() showHome: boolean = false;
    @Input() showTank: boolean = false;
    @Input() showWar: boolean = false;

    protected wording = wording.header;
    protected inventory = inventory;
}
