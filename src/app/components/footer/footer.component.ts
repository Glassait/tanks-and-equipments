import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, takeWhile } from 'rxjs';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { FeatureInterface } from '../../commons/interfaces/feature.interface';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { InventoryService } from '../../commons/services/inventory.service';
import { FeatureStore } from '../../commons/stores/feature.store';
import { MemberStore } from '../../commons/stores/member.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { ButtonSizeEnum } from '../button/enums/button-size.enum';
import { ButtonThemeEnum } from '../button/enums/button-theme.enum';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent extends UnsubscribeDirective implements OnInit {
    /**
     * Define the mode of the site (light or dark)
     * @protected
     */
    protected mode: ModeEnum;
    /**
     * Define if the user is a visitor or not
     * @protected
     */
    protected isVisitor: boolean;
    /**
     * Define all the button in the footer
     * @protected
     */
    protected links: {
        wording: string;
        path: string;
        allowVisitor: boolean;
        enabled: boolean | undefined;
    }[] = [
        {
            wording: 'header.home',
            path: 'path.home',
            allowVisitor: true,
            enabled: true,
        },
        {
            wording: 'header.charsEtEquipements',
            path: 'path.charsEtEquipements',
            allowVisitor: false,
            enabled: true,
        },
        {
            wording: 'header.clanWar',
            path: 'path.clanWar',
            allowVisitor: false,
            enabled: false,
        },
        {
            wording: 'footer.changelog',
            path: 'path.changelog',
            allowVisitor: false,
            enabled: true,
        },
        {
            wording: 'footer.agreements',
            path: 'path.agreements',
            allowVisitor: false,
            enabled: true,
        },
    ];

    /**
     * ENUM
     * @protected
     */
    protected readonly ModeEnum = ModeEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;
    protected readonly ButtonSizeEnum = ButtonSizeEnum;

    constructor(
        private inventory: InventoryService,
        private router: Router,
        private memberStore: MemberStore,
        private featureStore: FeatureStore,
        private modeStore: ModeStore
    ) {
        super();
    }

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.createSubscription();
    }

    /**
     * Click event from the button in the footer
     * @param path The path to navigate
     * @protected
     */
    protected navigate(path: string): void {
        this.router
            .navigate([this.inventory.getInventoryFromString(path)])
            .then((value: boolean): void => {
                if (value) {
                    window.scrollTo(0, 0);
                }
            });
    }

    /**
     * Create subscription to store to get all metadata
     * @private
     */
    private createSubscription(): void {
        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: ModeInterface): void => {
                this.mode = value.color;
            });

        this.memberStore
            .watch()
            .pipe(takeWhile((value: MemberInterface) => value !== null && value !== undefined))
            .subscribe((value: MemberInterface): void => {
                this.isVisitor = value.isVisitor;
            });

        this.featureStore
            .watch()
            .pipe(takeWhile((value: FeatureInterface) => value !== null && value !== undefined))
            .subscribe((value: FeatureInterface): void => {
                this.links[2].enabled = value.clanWar;
            });
    }
}
