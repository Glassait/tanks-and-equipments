import { Injectable } from '@angular/core';
import wording from 'src/assets/json/wording.json';

@Injectable({
    providedIn: 'root',
})
export class WordingClass {
    private _wording = wording;

    get wording() {
        return this._wording;
    }

    public getHeader() {
        return this._wording.header;
    }

    public getHome() {
        return this._wording.home;
    }
}
