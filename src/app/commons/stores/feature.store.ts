import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import {
    FeatureInterface,
    INITIAL_STATE_FEATURE,
} from '../interfaces/feature.interface';

@Injectable({
    providedIn: 'root',
})
export class FeatureStore extends Store<FeatureInterface> {
    constructor() {
        super(INITIAL_STATE_FEATURE);
    }
}
