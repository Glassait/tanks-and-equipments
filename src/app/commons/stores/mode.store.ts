import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import { ModeEnum } from '../enums/modeEnum';
import { ModeInterface } from '../interfaces/mode.interface';

@Injectable({
    providedIn: 'root',
})
export class ModeStore extends Store<ModeInterface> {
    constructor() {
        super({
            color: document.documentElement.classList.contains('dark')
                ? ModeEnum.DARK
                : ModeEnum.LIGHT,
            mobile: false,
        });
    }
}
