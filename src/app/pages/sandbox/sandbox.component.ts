import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { ModeEnum } from '../../commons/enums/modeEnum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { HeaderStore } from '../../commons/stores/header.store';
import { ModeStore } from '../../commons/stores/mode.store';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
})
export class SandboxComponent extends UnsubscribeDirective {
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
