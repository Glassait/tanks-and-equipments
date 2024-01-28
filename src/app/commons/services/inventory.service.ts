import { Injectable } from '@angular/core';
import inventory from 'src/assets/json/inventory.json';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    private _inventory = inventory;

    /**
     * Get the WoT clan id
     */
    public get clanId(): string {
        return this._inventory['wargaming-api']['clan-id'];
    }

    public get applicationId(): string {
        return this._inventory['wargaming-api']['application-id'];
    }

    /**
     * Get from the inventaire the url of the Wargaming api
     * Will add to this url all the data (application id, clan id, etc)
     * @param url The url to get
     * @param arg Can be the access token of the redirect url
     */
    public getWargamingApi(url: 'login' | 'login-mock', arg: string = ''): string {
        return this._inventory['wargaming-api'][url]
            .replace('applicationId', this._inventory['wargaming-api']['application-id'])
            .replace('redirectUri', arg);
    }

    public getPath() {
        return this._inventory.path;
    }

    public getInventoryFromString(path: string): string {
        return this.inventory(this._inventory, path.split('.'));
    }

    private inventory(inventory: any, args: string[]): string {
        const result = inventory[args.shift() as string];
        return args.length ? this.inventory(result, args) : result;
    }
}
