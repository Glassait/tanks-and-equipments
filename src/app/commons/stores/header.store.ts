import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import {
    HeaderInterface,
    INITIAL_STATE_HEADER,
} from '../interfaces/header.interface';

@Injectable({
    providedIn: 'root',
})
export class HeaderStore extends Store<HeaderInterface> {
    constructor() {
        super(INITIAL_STATE_HEADER);
    }
}
