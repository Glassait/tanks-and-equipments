import { Injectable } from '@angular/core';
import wording from 'src/assets/json/wording.json';

@Injectable({
    providedIn: 'root',
})
export class WordingService {
    private _wording = wording;

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

    get agreement() {
        return this._wording.agreements;
    }

    public getWordingFromString(path: string): string {
        return this.wording(this._wording, path.split('.'));
    }

    private wording(wording: any, args: string[]): string {
        const result = wording[args.shift() as string];
        return args.length ? this.wording(result, args) : result;
    }
}
