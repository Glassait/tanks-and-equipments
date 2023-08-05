import { Component } from '@angular/core';
import { IconRegistryService } from './commons/services/icon-registry.service';
import { chargeurIcon } from './components/icon/files/chargeur.icon';
import { castleIcon } from './components/icon/files/castle.icon';
import { mapIcon } from './components/icon/files/map.icon';
import { okIcon } from './components/icon/files/ok.icon';
import { superConquerorIcon } from './components/icon/files/super_conqueror.icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    protected title = 'app';

    constructor(private iconRegistry: IconRegistryService) {
        iconRegistry.register([chargeurIcon, castleIcon, mapIcon, okIcon, superConquerorIcon]);
    }
}
