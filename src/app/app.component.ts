import { Component } from '@angular/core';
import { IconRegistryService } from './commons/services/icon-registry.service';
import { chargeurIcon } from './components/icon/files/chargeur.icon';
import { castleIcon } from './components/icon/files/castle.icon';
import { mapIcon } from './components/icon/files/map.icon';
import { okIcon } from './components/icon/files/ok.icon';
import { superConquerorIcon } from './components/icon/files/super_conqueror.icon';
import { amxM4Mle54Icon } from './components/icon/files/amx_m4_mle54.icon';
import { cs63Icon } from './components/icon/files/cs-63.icon';
import { ebr105Icon } from './components/icon/files/ebr_105.icon';
import { is7Icon } from './components/icon/files/is-7.icon';
import { leopard1Icon } from './components/icon/files/leopard_1.icon';
import { object140Icon } from './components/icon/files/object_140.icon';
import { object260Icon } from './components/icon/files/object_260.icon';
import { object268version4Icon } from './components/icon/files/object_268_version_4.icon';
import { object277Icon } from './components/icon/files/object_277.icon';
import { object279Icon } from './components/icon/files/object_279.icon';
import { object907Icon } from './components/icon/files/object_907.icon';
import { strv103bIcon } from './components/icon/files/strv_103b.icon';
import { t95Fv4201ChieftainIcon } from './components/icon/files/t95_fv4201_chieftain.icon';
import { t110e3Icon } from './components/icon/files/t110e3.icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    protected title = 'app';

    constructor(private iconRegistry: IconRegistryService) {
        iconRegistry.register([
            chargeurIcon,
            castleIcon,
            mapIcon,
            okIcon,
            amxM4Mle54Icon,
            cs63Icon,
            ebr105Icon,
            is7Icon,
            leopard1Icon,
            object140Icon,
            object260Icon,
            object268version4Icon,
            object277Icon,
            object279Icon,
            object907Icon,
            strv103bIcon,
            superConquerorIcon,
            t95Fv4201ChieftainIcon,
            t110e3Icon,
        ]);
    }
}
