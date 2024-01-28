import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { MemberService } from '../../commons/abstract/member.service';
import { ModeService } from '../../commons/abstract/mode.service';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { InventoryService } from '../../commons/services/inventory.service';
import { FeaturesStore } from '../../commons/stores/features.store';
import { ButtonSizeEnum } from '../button/enums/button-size.enum';
import { ButtonThemeEnum } from '../button/enums/button-theme.enum';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { WordingPipe } from '../../pipes/wording.pipe';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { FeatureDto } from '../../../generated-api/features';

@Component({
    standalone: true,
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    imports: [NgOptimizedImage, ButtonComponent, WordingPipe, NgIf, SentenceCasePipe],
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
        admin: boolean;
        enabled: boolean;
    }[] = [
        {
            wording: 'header.home',
            path: 'path.home',
            allowVisitor: true,
            admin: false,
            enabled: true,
        },
        {
            wording: 'header.tanks-and-equipments',
            path: 'path.tanks-and-equipments',
            allowVisitor: false,
            admin: false,
            enabled: true,
        },
        {
            wording: 'header.clan-war',
            path: 'path.clan-war',
            allowVisitor: false,
            admin: false,
            enabled: false,
        },
        {
            wording: 'footer.changelog',
            path: 'path.changelog',
            allowVisitor: false,
            admin: false,
            enabled: true,
        },
        /*        {
         wording: 'footer.agreements',
         path: 'path.agreements',
         allowVisitor: false,
         enabled: true,
         },*/
        {
            wording: 'header.admin',
            path: 'path.admin',
            allowVisitor: false,
            admin: true,
            enabled: true,
        },
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
        private featureStore: FeaturesStore
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
            .pipe(takeWhile((features: FeatureDto) => features !== null && features !== undefined, true))
            .subscribe((features: FeatureDto): void => {
                this.links[2].enabled = features.clanWar;
            });
    }
}
