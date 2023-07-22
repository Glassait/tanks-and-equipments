import { Injectable } from '@angular/core';
import inventory from 'src/assets/json/inventory.json';

@Injectable({
    providedIn: 'root',
})
export class InventoryClass {
    private _inventory = inventory;

    public getWargammingApi() {
        return this._inventory.wargamingApi;
    }

    public getPath() {
        return this._inventory.path;
    }

    public getFeatureFlipping() {
        return this._inventory.featureFlipping;
    }
}
