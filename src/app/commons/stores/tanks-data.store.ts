import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import {
    INITIAL_STATE_TANKS_DATA,
    TanksDataInterface,
} from '../interfaces/tanks-data.interface';

@Injectable({
    providedIn: 'root',
})
export class TanksDataStore extends Store<TanksDataInterface> {
    constructor() {
        super(INITIAL_STATE_TANKS_DATA);
    }
}
