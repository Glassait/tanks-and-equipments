import { Injectable } from '@angular/core';
import information from 'src/assets/json/information.json';

@Injectable({
    providedIn: 'root',
})
export class InformationClass {
    private _information = information;

    public getText(): string {
        return this._information.text;
    }

    public getURL(): string {
        return this._information.lien.url;
    }

    public getLinkText(): string {
        return this._information.lien.text;
    }
}
