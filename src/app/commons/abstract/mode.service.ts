import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../directives/unsubscribe.directive';
import { ModeEnum } from '../enums/modeEnum';
import { ModeInterface } from '../interfaces/mode.interface';
import { ModeStore } from '../stores/mode.store';

@Injectable({
    providedIn: 'root',
})
export class ModeService extends UnsubscribeDirective {
    /**
     * The settings of the user (light or dark mode)
     */
    public mode: ModeEnum;
    /**
     * Define if the screen size if a size of a mobile
     */
    public isMobile: boolean;

    constructor(private modeStore: ModeStore) {
        super();
    }

    public watchModeStore(): void {
        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: ModeInterface): void => {
                this.mode = value.color;
                this.isMobile = value.mobile;
            });
    }
}
