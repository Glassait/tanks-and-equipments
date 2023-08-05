import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { SvgCustom } from 'src/app/commons/classes/svg-custom.class';
import { HeaderInterface } from 'src/app/commons/interfaces/header.interface';
import { MemberInterface } from 'src/app/commons/interfaces/member.interface';
import { ModeInterface } from 'src/app/commons/interfaces/mode.interface';
import { InventoryService } from 'src/app/commons/services/inventory.service';
import { WordingService } from 'src/app/commons/services/wording.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { ModeStore } from 'src/app/commons/stores/mode.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('darkModeSwitch', { read: ElementRef }) element:
        | ElementRef
        | undefined;

    protected showHome: boolean;
    protected showTank: boolean;
    protected showWar: boolean;
    protected isVisitor: boolean;
    protected isDark: boolean;

    private headerSubscribe: Subscription;
    private memberSubscribe: Subscription;
    private modeSubscribe: Subscription;

    constructor(
        protected modeStore: ModeStore,
        protected memberStore: MemberStore,
        protected wording: WordingService,
        protected inventory: InventoryService,
        private headerStore: HeaderStore
    ) {}

    ngOnInit(): void {
        this.createSubscribe();
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

    ngOnDestroy(): void {
        this.memberSubscribe.unsubscribe();
        this.headerSubscribe.unsubscribe();
        this.modeSubscribe.unsubscribe();
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

    private createSubscribe(): void {
        this.headerSubscribe = this.headerStore
            .watch()
            .subscribe((value: HeaderInterface): void => {
                this.showHome = value.showHome;
                this.showTank = value.showTank;
                this.showWar = value.showWar;
            });

        this.memberSubscribe = this.memberStore
            .watch()
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
            });

        this.modeSubscribe = this.modeStore
            .watch()
            .subscribe((value: ModeInterface): void => {
                this.isDark = value.dark;
            });
    }
}
