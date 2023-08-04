import { Injectable } from '@angular/core';
import wording from 'src/assets/json/wording.json';

@Injectable({
    providedIn: 'root',
})
export class WordingService {
    private _wording = wording;

    get wording() {
        return this._wording;
    }

    public getHeader() {
        console.log('Get header called');

        return this._wording.header;
    }

    public getHome() {
        return this._wording.home;
    }
}
