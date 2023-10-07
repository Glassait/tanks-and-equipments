import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UnsubscribeComponent } from '../../commons/directives/unsubscribe.component';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { HeaderStore } from '../../commons/stores/header.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { ButtonSizeEnum } from '../../components/button/enums/button-size.enum';
import { ButtonThemeEnum } from '../../components/button/enums/button-theme.enum';
import { ButtonTypeEnum } from '../../components/button/enums/button-type.enum';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
})
export class SandboxComponent extends UnsubscribeComponent {
    protected color: ModeEnum;

    /**
     * ENUM
     */
    protected readonly ColorEnum = ModeEnum;
    protected readonly ButtonTypeEnum = ButtonTypeEnum;
    protected readonly SizeEnum = ButtonSizeEnum;
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ButtonThemeEnum = ButtonThemeEnum;

    constructor(
        private router: Router,
        private modeStore: ModeStore,
        private headerStore: HeaderStore
    ) {
        super();

        if (!isDevMode()) {
            this.router.navigate(['/']).then((): void => {
                // Ignored
            });
        }

        this.headerStore.patch({
            showTank: true,
            showWar: true,
            showHome: true,
        });

        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((modeInterface: ModeInterface): void => {
                this.color = modeInterface.color;
            });
    }
}
