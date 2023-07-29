import { Injectable } from '@angular/core';
import { ModeInterface } from '../interfaces/mode.interface';
import { Store } from '@elie29/store';

@Injectable({
    providedIn: 'root',
})
export class ModeStore extends Store<ModeInterface> {
    constructor() {
        super({
            dark: document.documentElement.classList.contains('dark'),
        });
    }
}
