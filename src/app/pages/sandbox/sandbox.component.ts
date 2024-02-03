import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { HeaderStore } from '../../commons/stores/header.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
})
export class SandboxComponent {
    //region PROTECTED FIELD
    protected color: ModeEnum;
    //endregion

    //region ENUM
    protected readonly IconColorEnum = IconColorEnum;
    protected readonly ModeEnum = ModeEnum;

    //endregion

    constructor(
        private router: Router,
        private modeStore: ModeStore,
        private headerStore: HeaderStore
    ) {
        if (!isDevMode()) {
            this.router.navigate(['/']).then((): void => {
                // Ignored
            });
        }

        this.headerStore.patch({
            showTank: true,
            showWar: true,
            showHome: true,
            showAdmin: true,
        });

        this.modeStore
            .watch()
            .pipe(takeUntilDestroyed())
            .subscribe((modeInterface: ModeInterface): void => {
                this.color = modeInterface.color;
            });
    }
}
