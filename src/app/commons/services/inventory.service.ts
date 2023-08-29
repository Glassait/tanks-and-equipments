import { Injectable } from '@angular/core';
import inventory from 'src/assets/json/inventory.json';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    private _inventory = inventory;

    public getWargamingApi() {
        return this._inventory.wargamingApi;
    }

    public getPath() {
        return this._inventory.path;
    }

    public getLchpApi() {
        return this._inventory.lchpApi;
    }
}
