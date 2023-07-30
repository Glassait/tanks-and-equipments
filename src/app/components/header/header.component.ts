import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { HeaderInterface } from 'src/app/commons/interfaces/header.interface';
import { WordingService } from 'src/app/commons/services/wording.service';
import { InventoryService } from 'src/app/commons/services/inventory.service';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { SvgCustom } from 'src/app/commons/classes/svg-custom.class';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ModeStore } from 'src/app/commons/stores/mode.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterViewInit {
    @ViewChild('darkModeSwitch', { read: ElementRef }) element:
        | ElementRef
        | undefined;

    protected showHome: boolean;
    protected showTank: boolean;
    protected showWar: boolean;

    constructor(
        private headerStore: HeaderStore,
        protected modeStore: ModeStore,
        protected memberStore: MemberStore,
        protected wording: WordingService,
        protected inventory: InventoryService
    ) {
        this.watchStore();
    }

    ngAfterViewInit(): void {
        if (this.element) {
            this.element.nativeElement
                .querySelector('.mdc-switch__icon--on')
                .firstChild.setAttribute('d', SvgCustom.sun);
            this.element.nativeElement
                .querySelector('.mdc-switch__icon--off')
                .firstChild.setAttribute('d', SvgCustom.moon);
        }
    }

    private watchStore() {
        this.headerStore.watch().subscribe((value: HeaderInterface) => {
            this.showHome = value.showHome;
            this.showTank = value.showTank;
            this.showWar = value.showWar;
        });
    }

    protected changeMode($event: MatSlideToggleChange) {
        if ($event.checked) {
            document.documentElement.classList.add('dark');
            this.modeStore.set('dark', true);
        } else {
            document.documentElement.classList.remove('dark');
            this.modeStore.set('dark', false);
        }
    }
}
