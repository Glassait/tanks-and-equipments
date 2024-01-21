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

    /**
     * Get from the inventaire the url of the Wargaming api
     * Will add to this url all the data (application id, clan id, etc)
     * @param url The url to get
     * @param arg Can be the access token of the redirect url
     */
    public getWargamingApi(
        url: 'log-out' | 'game-servers' | 'login' | 'member-online' | 'login-mock' | 'clan_reserves',
        arg: string = ''
    ): string {
        return this._inventory['wargaming-api'][url]
            .replace('applicationId', this._inventory['wargaming-api']['application-id'])
            .replace('clanId', this._inventory['wargaming-api']['clan-id'])
            .replace('accessToken', arg)
            .replace('redirectUri', arg);
    }

    public getPath() {
        return this._inventory.path;
    }

    public getGlassaitApi() {
        return this._inventory['glassait-api'];
    }

    public getInventoryFromString(path: string): string {
        return this.inventory(this._inventory, path.split('.'));
    }

    private inventory(inventory: any, args: string[]): string {
        const result = inventory[args.shift() as string];
        return args.length ? this.inventory(result, args) : result;
    }
}
