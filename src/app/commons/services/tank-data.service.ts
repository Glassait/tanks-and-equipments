import { Injectable } from '@angular/core';
import tanksData from 'src/assets/json/tanksData.json';
import { TankData, Tanks } from '../types/tanks-data.type';

@Injectable({
    providedIn: 'root',
})
export class TanksDataService {
    private _tanksData: Tanks = tanksData as Tanks;

    public getTankDataArray(): TankData[] {
        return this._tanksData.data;
    }
}
