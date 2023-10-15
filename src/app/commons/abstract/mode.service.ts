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
    constructor(private modeStore: ModeStore) {
        super();
    }

    /**
     * The settings of the user (light or dark mode)
     * @private
     */
    private _mode: ModeEnum;

    /**
     * @see _mode
     */
    get mode(): ModeEnum {
        return this._mode;
    }

    public watchModeStore(): void {
        this.modeStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: ModeInterface): void => {
                this._mode = value.color;
            });
    }
}
