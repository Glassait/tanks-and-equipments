import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { HeaderInterface } from 'src/app/commons/interfaces/header.interface';
import { InventoryService } from 'src/app/commons/services/inventory.service';
import { WordingService } from 'src/app/commons/services/wording.service';
import { HeaderStore } from 'src/app/commons/stores/header.store';
import { ModeStore } from 'src/app/commons/stores/mode.store';
import { SvgCustom } from 'src/app/commons/utils/svg-custom.util';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { FeaturesStore } from '../../commons/stores/features.store';
import { MenuItemType } from '../menu/types/menu-item.type';
import { ButtonThemeEnum } from '../button/enums/button-theme.enum';
import { ButtonTypeEnum } from '../button/enums/button-type.enum';
import { AuthenticationService } from '../../commons/services/authentication.service';
import { InventoryPipe } from '../../pipes/inventory.pipe';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { WordingPipe } from '../../pipes/wording.pipe';
import { ButtonComponent } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';
import { MemberStore } from '../../commons/stores/member.store';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { FeatureDto } from '../../../generated-api/features';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Component for the header of the site
 */
@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [MatSlideToggleModule, InventoryPipe, NgOptimizedImage, WordingPipe, TitleCasePipe, ButtonComponent, MenuComponent],
})
export class HeaderComponent implements AfterViewInit {
    @ViewChild('darkModeSwitch', { read: ElementRef }) slideToogle: ElementRef | undefined;

    //region PROTECTED FIELD
    /**
     * The menu item to pass to {@link MenuComponent}
     * @protected
     */
    protected menuItems: MenuItemType[];
    /**
     * The option of the header
     * @protected
     */
    protected header: HeaderInterface;
    //endregion

    //region ENUM
    protected readonly ModeEnum = ModeEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;
    protected readonly ButtonTypeEnum = ButtonTypeEnum;
    //endregion

    //region PRIVATE FIELD
    /**
     * All the features of the site
     * @private
     */
    private features: FeatureDto;
    //endregion

    //region PRIVATE READONLY
    /**
     * All the items of the navigation menu
     * @private
     */
    private readonly allMenuItems: MenuItemType[];

    //endregion

    constructor(
        // STORE
        private readonly modeStore: ModeStore,
        private readonly memberStore: MemberStore,
        private readonly headerStore: HeaderStore,
        private readonly featureStore: FeaturesStore,
        // SERVICE
        private readonly wording: WordingService,
        private readonly inventory: InventoryService,
        private readonly auth: AuthenticationService,
        protected readonly memberService: MemberService,
        protected readonly modeService: ModeService,
        // ANGULAR
        private readonly router: Router
    ) {
        this.allMenuItems = [
            {
                text: this.wording.getWordingFromString('header.home'),
                callback: (): void => {
                    this.router.navigate([this.inventory.getInventoryFromString('path.home')]).then((_r: boolean): void => {});
                },
            },
            {
                text: this.wording.getWordingFromString('header.tanks-and-equipments'),
                callback: (): void => {
                    this.router
                        .navigate([this.inventory.getInventoryFromString('path.tanks-and-equipments')])
                        .then((_r: boolean): void => {});
                },
            },
            {
                text: this.wording.getWordingFromString('header.clan-war'),
                callback: (): void => {
                    this.router.navigate([this.inventory.getInventoryFromString('path.clan-war')]).then((_r: boolean): void => {});
                },
            },
            {
                text: this.wording.getWordingFromString('header.admin'),
                callback: (): void => {
                    this.router.navigate([this.inventory.getInventoryFromString('path.admin')]).then((_r: boolean): void => {});
                },
            },
        ];

        this.createSubscribe();
    }

    /**
     * Implementation of the {@link AfterViewInit} interface
     */
    ngAfterViewInit(): void {
        if (this.slideToogle) {
            const svgOn = this.slideToogle.nativeElement.querySelector('.mdc-switch__icon--on');
            svgOn.setAttribute('viewBox', '-2 -2 60 60');

            const svgSun = svgOn.firstChild;
            svgSun.setAttribute('d', SvgCustom.sun);
            svgSun.setAttribute('stroke', '#050505');
            svgSun.setAttribute('stroke-width', 2);
            svgSun.setAttribute('stroke-linecap', 'round');
            svgSun.setAttribute('stroke-linejoin', 'round');
            svgSun.setAttribute('fill', 'none');

            const svgOff = this.slideToogle.nativeElement.querySelector('.mdc-switch__icon--off');
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
     * Slide toggle event that changes between light and dark mode
     * @param {MatSlideToggleChange} change - The change event
     * @protected
     */
    protected changeMode(change: MatSlideToggleChange): void {
        if (change.checked) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            this.modeStore.set('color', ModeEnum.DARK);
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            this.modeStore.set('color', ModeEnum.LIGHT);
        }
    }

    /**
     * Logs the user in
     */
    protected login(): void {
        this.auth.login();
    }

    /**
     * Create all subscription to different store
     * @private
     */
    private createSubscribe(): void {
        this.featureStore
            .watch()
            .pipe(takeWhile((value: any) => value !== null && value !== undefined, true))
            .subscribe((features: FeatureDto): void => {
                this.features = features;
            });

        this.headerStore
            .watch()
            .pipe(takeUntilDestroyed())
            .subscribe((headerInterface: HeaderInterface): void => {
                this.header = headerInterface;
                this.createMenuItemList(headerInterface);
            });

        this.memberStore
            .watch()
            .pipe(takeUntilDestroyed())
            .subscribe((_value: MemberInterface): void => {
                this.createMenuItemList(this.header);
            });
    }

    /**
     * Creates the list of items for {@link MenuComponent}
     * @param {HeaderInterface} header - The header interface
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

        if (header.showWar && this.features && this.features.clanWar) {
            this.menuItems.push(this.allMenuItems[2]);
        }

        if (header.showAdmin && !this.memberService.isVisitor && this.memberService.isAdmin) {
            this.menuItems.push(this.allMenuItems[3]);
        }
    }
}
