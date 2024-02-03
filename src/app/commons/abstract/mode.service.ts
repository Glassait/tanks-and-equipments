import { Injectable } from '@angular/core';
import { ModeEnum } from '../enums/modeEnum';
import { ModeInterface } from '../interfaces/mode.interface';
import { ModeStore } from '../stores/mode.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class ModeService {
    /**
     * The settings of the user (light or dark mode)
     */
    public mode: ModeEnum;
    /**
     * Define if the screen size if a size of a mobile
     */
    public isMobile: boolean;

    constructor(private modeStore: ModeStore) {
        this.mode = this.modeStore.get('color');
        this.isMobile = this.modeStore.get('mobile');

        this.watchModeStore();
    }

    private watchModeStore(): void {
        this.modeStore
            .watch()
            .pipe(takeUntilDestroyed())
            .subscribe((value: ModeInterface): void => {
                this.mode = value.color;
                this.isMobile = value.mobile;
            });
    }
}
