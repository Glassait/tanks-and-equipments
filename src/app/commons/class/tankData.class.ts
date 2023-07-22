import { Injectable } from '@angular/core';
import { Tanks } from 'src/app/commons/types/tanksData.types';
import tanksData from 'src/assets/json/tanksData.json';

@Injectable({
    providedIn: 'root',
})
export class TanksDataClass {
    private _tanksData: Tanks = tanksData as Tanks;

    get tanksData(): Tanks {
        return this._tanksData;
    }
}
