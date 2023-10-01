import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { ColorEnum } from '../../commons/enums/color.enum';
import { ModeInterface } from '../../commons/interfaces/mode.interface';
import { ModeStore } from '../../commons/stores/mode.store';
import { ButtonTypeEnum } from '../../components/button/enums/button-type.enum';
import { SizeEnum } from '../../components/button/enums/size.enum';
import { UnsubscribeComponent } from '../../components/commons/unsubscribe.component';
import { IconColorEnum } from '../../components/icon/enums/icon-enum';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
})
export class SandboxComponent extends UnsubscribeComponent {
    protected color: ColorEnum;

    /**
     * ENUM
     */
    protected readonly ColorEnum = ColorEnum;
    protected readonly ButtonTypeEnum = ButtonTypeEnum;
    protected readonly SizeEnum = SizeEnum;
    protected readonly IconColorEnum = IconColorEnum;

    constructor(
        private router: Router,
        private modeStore: ModeStore
    ) {
        super();

        if (!isDevMode()) {
            this.router.navigate(['/']).then((): void => {
                // Ignored
            });
        }

        this.addSubscription(
            this.modeStore.watch().subscribe((modeInterface: ModeInterface): void => {
                this.color = modeInterface.color;
            })
        );
    }
}
