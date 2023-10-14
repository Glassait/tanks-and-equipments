import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { takeUntil, takeWhile } from 'rxjs';
import { UnsubscribeDirective } from 'src/app/commons/directives/unsubscribe.directive';
import { HeaderInterface } from 'src/app/commons/interfaces/header.interface';
import { MemberInterface } from 'src/app/commons/interfaces/member.interface';
import { ModeInterface } from 'src/app/commons/interfaces/mode.interface';
import { InventoryService } from 'src/app/commons/services/inventory.service';
import { WordingService } from 'src/app/commons/services/wording.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { MemberStore } from 'src/app/commons/stores/member.store';
import { ModeStore } from 'src/app/commons/stores/mode.store';
import { SvgCustom } from 'src/app/commons/utils/svg-custom.util';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { FeatureInterface } from '../../commons/interfaces/feature.interface';
import { FeatureStore } from '../../commons/stores/feature.store';
import { MenuItemType } from '../menu/types/menu-item.type';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent extends UnsubscribeDirective implements OnInit, AfterViewInit {
    @ViewChild('darkModeSwitch', { read: ElementRef }) element: ElementRef | undefined;

    /**
     * Define is the user is a visitor or not
     * @protected
     */
    protected isVisitor: boolean;
    /**
     * Define the mode of the site (light or dark)
     * @protected
     */
    protected mode: ModeEnum;
    /**
     * The menu item to pass to {@link MenuComponent}
     * @protected
     */
    protected menuItems: MenuItemType[];

    /**
     * ENUM
     */
    protected readonly ModeEnum = ModeEnum;

    /**
     * All the feature of the site
     * @private
     */
    private feature: FeatureInterface;

    /**
     * The day of the week
     * Used for the background
     * @private
     */
    private readonly dayNumber: number;
    /**
     * All the items of the navigation menu
     * @private
     */
    private readonly allMenuItems: MenuItemType[];

    constructor(
        protected modeStore: ModeStore,
        protected memberStore: MemberStore,
        protected wording: WordingService,
        protected inventory: InventoryService,
        private headerStore: HeaderStore,
        private featureStore: FeatureStore,
        private router: Router
    ) {
        super();
        this.dayNumber = new Date().getDay();

        this.allMenuItems = [
            {
                text: wording.getWordingFromString('header.home'),
                callback: (): void => {
                    this.router
                        .navigate([inventory.getInventoryFromString('path.home')])
                        .then(_r => {});
                },
            },
            {
                text: wording.getWordingFromString('header.charsEtEquipements'),
                callback: (): void => {
                    this.router
                        .navigate([inventory.getInventoryFromString('path.charsEtEquipements')])
                        .then(_r => {});
                },
            },
            {
                text: wording.getWordingFromString('header.clanWar'),
                callback: (): void => {
                    this.router
                        .navigate([inventory.getInventoryFromString('path.clanWar')])
                        .then(_r => {});
                },
            },
        ];
    }

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.createSubscribe();
    }

    /**
     * Implementation of the {@link AfterViewInit} interface
     */
    ngAfterViewInit(): void {
        if (this.element) {
            const svgOn = this.element.nativeElement.querySelector('.mdc-switch__icon--on');
            svgOn.setAttribute('viewBox', '-2 -2 60 60');

            const svgSun = svgOn.firstChild;
            svgSun.setAttribute('d', SvgCustom.sun);
            svgSun.setAttribute('stroke', '#050505');
            svgSun.setAttribute('stroke-width', 2);
            svgSun.setAttribute('stroke-linecap', 'round');
            svgSun.setAttribute('stroke-linejoin', 'round');
            svgSun.setAttribute('fill', 'none');

            const svgOff = this.element.nativeElement.querySelector('.mdc-switch__icon--off');
            svgOff.setAttribute('viewBox', '-2 -2 60 60');

            const svgMoon = svgOff.firstChild;
            svgMoon.setAttribute('d', SvgCustom.moon);
            svgMoon.setAttribute('stroke', '#FBFBFB');
            svgMoon.setAttribute('stroke-width', 2);
            svgMoon.setAttribute('stroke-linecap', 'round');
            svgMoon.setAttribute('stroke-linejoin', 'round');
            svgMoon.setAttribute('fill', 'none');
        }
    }

    /**
     * Slide toggle event that change between light and dark mode
     * @param change
     * @protected
     */
    protected changeMode(change: MatSlideToggleChange): void {
        if (change.checked) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.background = `url('/assets/backgrounds/bg-dark-${this.dayNumber}.png') center center no-repeat fixed`;
            document.documentElement.classList.remove('light');
            this.modeStore.set('color', ModeEnum.DARK);
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.style.background = `url('/assets/backgrounds/bg-light-${this.dayNumber}.png') center center no-repeat fixed`;
            document.documentElement.classList.remove('dark');
            this.modeStore.set('color', ModeEnum.LIGHT);
        }
    }

    /**
     * Create all subscription to different store
     * @private
     */
    private createSubscribe(): void {
        this.headerStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((headerInterface: HeaderInterface): void => {
                this.createMenuItemList(headerInterface);
            });

        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((modeInterface: ModeInterface): void => {
                this.mode = modeInterface.color;
            });

        this.memberStore
            .watch()
            .pipe(takeWhile((value: MemberInterface) => value !== null && value !== undefined))
            .subscribe((memberInterface: MemberInterface): void => {
                this.isVisitor = memberInterface.isVisitor;
            });

        this.featureStore
            .watch()
            .pipe(takeWhile((value: FeatureInterface) => value !== null && value !== undefined))
            .subscribe((featureInterface: FeatureInterface): void => {
                this.feature = featureInterface;
            });
    }

    /**
     * Create the list of items for {@link MenuComponent}
     * @param header
     * @private
     */
    private createMenuItemList(header: HeaderInterface): void {
        if (!header) {
            return;
        }
        this.menuItems = [];

        if (header.showHome) {
            this.menuItems.push(this.allMenuItems[0]);
        }

        if (header.showTank) {
            this.menuItems.push(this.allMenuItems[1]);
        }

        if (header.showWar && this.feature && this.feature.clanWar) {
            this.menuItems.push(this.allMenuItems[2]);
        }
    }
}
