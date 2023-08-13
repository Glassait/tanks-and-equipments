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

    get header() {
        return this._wording.header;
    }

    get home() {
        return this._wording.home;
    }

    get footer() {
        return this._wording.footer;
    }

    get changelog() {
        return this._wording.changelog;
    }
}
