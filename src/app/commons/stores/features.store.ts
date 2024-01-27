import { Injectable } from '@angular/core';
import { Store } from '@elie29/store';
import { FeatureDto } from '../../../generated-api/glassait/features';

@Injectable({
    providedIn: 'root',
})
export class FeaturesStore extends Store<FeatureDto> {
    constructor() {
        super({
            clanWar: false,
        });
    }
}
