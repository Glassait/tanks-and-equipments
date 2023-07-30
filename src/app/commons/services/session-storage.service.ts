import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    private _session = sessionStorage;

    public store(key: string, value: string) {
        this._session.setItem(key, value);
    }

    public getFromKey(key: string): string | null {
        return this._session.getItem(key);
    }

    public getFromKeyToObject<T>(key: string): T | null {
        const obj = this.getFromKey(key);
        if (!obj) {
            return null;
        }
        return JSON.parse(obj);
    }
}
