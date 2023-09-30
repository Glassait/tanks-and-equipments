import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import { ColorEnum } from '../enums/color.enum';
import { ModeInterface } from '../interfaces/mode.interface';

@Injectable({
    providedIn: 'root',
})
export class ModeStore extends Store<ModeInterface> {
    constructor() {
        super({
            color: document.documentElement.classList.contains('dark')
                ? ColorEnum.DARK
                : ColorEnum.LIGHT,
            mobile: false,
        });
    }
}
