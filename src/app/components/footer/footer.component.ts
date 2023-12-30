import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { FeatureInterface } from '../../commons/interfaces/feature.interface';
import { InventoryService } from '../../commons/services/inventory.service';
import { FeatureStore } from '../../commons/stores/feature.store';
import { ButtonSizeEnum } from '../button/enums/button-size.enum';
import { ButtonThemeEnum } from '../button/enums/button-theme.enum';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
    //region PROTECTED FIELD
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
            wording: 'header.tanks-and-equipments',
            path: 'path.tanks-and-equipments',
            allowVisitor: false,
            enabled: true,
        },
        {
            wording: 'header.clan-war',
            path: 'path.clan-war',
            allowVisitor: false,
            enabled: false,
        },
        {
            wording: 'footer.changelog',
            path: 'path.changelog',
            allowVisitor: false,
            enabled: true,
        },
        /*        {
            wording: 'footer.agreements',
            path: 'path.agreements',
            allowVisitor: false,
            enabled: true,
        },*/
    ];
    //endregion

    //region ENUM
    protected readonly ModeEnum = ModeEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;
    protected readonly ButtonSizeEnum = ButtonSizeEnum;
    //endregion

    constructor(
        // SERVICE
        private inventory: InventoryService,
        protected memberService: MemberService,
        protected modeService: ModeService,
        // ANGULAR
        private router: Router,
        // STORE
        private featureStore: FeatureStore
    ) {}

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
        this.router.navigate([this.inventory.getInventoryFromString(path)]).then((value: boolean): void => {
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
        this.featureStore
            .watch()
            .pipe(takeWhile((value: FeatureInterface) => value !== null && value !== undefined, true))
            .subscribe((value: FeatureInterface): void => {
                this.links[2].enabled = value.clanWar;
            });
    }
}
