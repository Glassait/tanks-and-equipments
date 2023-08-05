import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
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
import { MemberInterface } from 'src/app/commons/interfaces/member.interface';
import { ModeInterface } from 'src/app/commons/interfaces/mode.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, AfterViewInit {
    @ViewChild('darkModeSwitch', { read: ElementRef }) element:
        | ElementRef
        | undefined;

    protected showHome: boolean;
    protected showTank: boolean;
    protected showWar: boolean;
    protected isVisitor: boolean;
    protected isDark: boolean;

    constructor(
        private headerStore: HeaderStore,
        protected modeStore: ModeStore,
        protected memberStore: MemberStore,
        protected wording: WordingService,
        protected inventory: InventoryService
    ) {}

    ngOnInit(): void {
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
        this.headerStore.watch().subscribe((value: HeaderInterface): void => {
            this.showHome = value.showHome;
            this.showTank = value.showTank;
            this.showWar = value.showWar;
        });

        this.memberStore.watch().subscribe((value: MemberInterface): void => {
            this.isVisitor = value.isVisitor;
        });

        this.modeStore.watch().subscribe((value: ModeInterface): void => {
            this.isDark = value.dark;
        });
    }

    protected changeMode($event: MatSlideToggleChange): void {
        if ($event.checked) {
            document.documentElement.classList.add('dark');
            this.modeStore.set('dark', true);
        } else {
            document.documentElement.classList.remove('dark');
            this.modeStore.set('dark', false);
        }
    }
}
