import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import {
    FooterInterface,
    INITIAL_STATE_FOOTER,
} from '../interfaces/footer.interface';

@Injectable({
    providedIn: 'root',
})
export class FooterStore extends Store<FooterInterface> {
    constructor() {
        super(INITIAL_STATE_FOOTER);
    }
}
