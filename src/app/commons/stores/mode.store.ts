import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import { ModeInterface } from '../interfaces/mode.interface';

@Injectable({
    providedIn: 'root',
})
export class ModeStore extends Store<ModeInterface> {
    constructor() {
        super({
            dark: document.documentElement.classList.contains('dark'),
            mobile: false,
        });
    }
}
