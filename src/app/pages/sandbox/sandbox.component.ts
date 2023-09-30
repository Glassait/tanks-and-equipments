import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { ColorEnum } from '../../commons/enums/color.enum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { ModeStore } from '../../commons/stores/mode.store';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
})
export class SandboxComponent {
    protected color: ColorEnum;

    /**
     * ENUM
     */
    protected readonly ColorEnum = ColorEnum;

    constructor(
        private router: Router,
        private modeStore: ModeStore
    ) {
        if (!isDevMode()) {
            this.router.navigate(['/']).then((): void => {
                // Ignored
            });
        }

        this.modeStore.watch().subscribe((modeInterface: ModeInterface): void => {
            this.color = modeInterface.color;
            console.log(this.color);
        });
    }
}
