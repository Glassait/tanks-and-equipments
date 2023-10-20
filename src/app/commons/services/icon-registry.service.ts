import { Injectable } from '@angular/core';
import { Icon } from '../utils/icon.util';

@Injectable({
    providedIn: 'root',
})
export class IconRegistryService {
    private _registry: Map<string, Icon> = new Map<string, Icon>();

    public register(icons: Icon[]): void {
        icons.forEach((icon: Icon): void => {
            this._registry.set(icon.name, icon);
        });
    }

    public get(icon: string): Icon | undefined {
        return this._registry.get(icon);
    }
}
