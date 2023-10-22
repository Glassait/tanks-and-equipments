import { Injectable } from '@angular/core';
import { CookieNameEnum } from '../enums/cookie-name.enum';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    private _session: Storage = sessionStorage;

    /**
     * Store the value in the session storage with the specified key
     * @param key The key of the value
     * @param value The value to store
     */
    public store(key: string, value: string): void {
        this._session.setItem(key, value);
    }

    /**
     * Get the value stored with the specific key
     * @param key The key to get the value
     */
    public getFromKey(key: string): string | null {
        return this._session.getItem(key);
    }

    /**
     * Get the value stored with the specific key and parse it with {@link JSON.parse}
     * @param key The key to get the value
     */
    public getFromKeyToObject<T>(key: string): T | null {
        const obj: string | null = this.getFromKey(key);
        if (!obj) {
            return null;
        }
        return JSON.parse(obj);
    }

    /**
     * Delete all the data store in the session
     */
    public deleteAll(): void {
        this._session.removeItem(CookieNameEnum.TANKS_DATE);
        this._session.removeItem(CookieNameEnum.TANKS_DATA);
    }
}
