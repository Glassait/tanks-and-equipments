import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { CookieNameEnum } from '../../commons/enums/cookie-name.enum';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { InformationService } from '../../commons/services/information.service';
import { InventoryService } from '../../commons/services/inventory.service';
import { HeaderStore } from '../../commons/stores/header.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { InformationType } from '../../commons/types/information.type';
import { DateCustom } from '../../commons/utils/date.custom';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent extends UnsubscribeDirective implements OnInit {
    /**
     * Define the mode of the site (light or dark)
     * @protected
     */
    protected mode: ModeEnum;
    /**
     * Store the result of the api call to get the information of the clan
     * @protected
     */
    protected information: { isLoading: boolean; isError: boolean; information?: InformationType } =
        {
            isLoading: true,
            isError: false,
        };

    /**
     * ENUM
     * @protected
     */
    protected readonly ModeEnum = ModeEnum;
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;

    constructor(
        private headerStore: HeaderStore,
        private modeStore: ModeStore,
        private cookie: CookieService,
        private informationService: InformationService,
        private inventoryService: InventoryService,
        private router: Router
    ) {
        super();
    }

    // protected navigate(path: string | undefined): void {
    //     if (!path) {
    //         return;
    //     }
    //
    //     this.router
    //         .navigate([this.inventoryService.getInventoryFromString(path)])
    //         .then((value: boolean): void => {
    //             if (value) {
    //                 window.scrollTo(0, 0);
    //             }
    //         });
    // }

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.headerStore.patch({
            showHome: false,
            showWar: true,
            showTank: true,
        });

        this.createSubscription();

        this.getInformation();
    }

    /**
     * Get the information of the clan from the api or the cookie
     * @private
     */
    private getInformation(): void {
        const cookie: string = this.cookie.get(CookieNameEnum.INFORMATION);
        if (cookie) {
            this.information.information = JSON.parse(cookie);
            this.information.isLoading = false;
            return;
        }

        this.informationService.queryInformation().subscribe({
            next: (value: InformationType): void => {
                this.information.information = value;
            },
            error: _err => {
                this.information.isError = true;
            },
            complete: (): void => {
                this.cookie.set(
                    CookieNameEnum.INFORMATION,
                    JSON.stringify(this.information.information),
                    DateCustom.getMidnightDate()
                );
                this.information.isLoading = false;
            },
        });
    }

    /**
     * Create all subscription to get the metadata of the sire
     * @private
     */
    private createSubscription(): void {
        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: ModeInterface): void => {
                this.mode = value.color;
            });
    }
}
