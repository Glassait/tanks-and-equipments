import { Injectable } from '@angular/core';
import { Icon } from '../utils/icon.util';

@Injectable({
    providedIn: 'root',
})
export class IconRegistryService {
    private _registry = new Map<string, string>();

    public register(icons: Icon[]) {
        icons.forEach((icon: Icon) => {
            this._registry.set(icon.name, icon.data);
        });
    }

    public get(icon: string): string | undefined {
        return this._registry.get(icon);
    }
}
