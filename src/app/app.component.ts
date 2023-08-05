import { Component, HostListener } from '@angular/core';
import { IconRegistryService } from './commons/services/icon-registry.service';
import { ModeStore } from './commons/stores/mode.store';
import { chargeurIcon } from './components/icon/files/crews/chargeur.icon';
import { commandantIcon } from './components/icon/files/crews/commandant.icon';
import { operateurRadioIcon } from './components/icon/files/crews/operateur-radio.icon';
import { piloteDeCharsIcon } from './components/icon/files/crews/pilote-de-chars.icon';
import { tireurIcon } from './components/icon/files/crews/tireur.icon';
import { castleIcon } from './components/icon/files/other/castle.icon';
import { mapIcon } from './components/icon/files/other/map.icon';
import { okIcon } from './components/icon/files/other/ok.icon';
import { amxM4Mle54Icon } from './components/icon/files/tanks/amx_m4_mle54.icon';
import { cs63Icon } from './components/icon/files/tanks/cs-63.icon';
import { ebr105Icon } from './components/icon/files/tanks/ebr_105.icon';
import { is7Icon } from './components/icon/files/tanks/is-7.icon';
import { leopard1Icon } from './components/icon/files/tanks/leopard_1.icon';
import { object140Icon } from './components/icon/files/tanks/object_140.icon';
import { object260Icon } from './components/icon/files/tanks/object_260.icon';
import { object268version4Icon } from './components/icon/files/tanks/object_268_version_4.icon';
import { object277Icon } from './components/icon/files/tanks/object_277.icon';
import { object279Icon } from './components/icon/files/tanks/object_279.icon';
import { object907Icon } from './components/icon/files/tanks/object_907.icon';
import { strv103bIcon } from './components/icon/files/tanks/strv_103b.icon';
import { superConquerorIcon } from './components/icon/files/tanks/super_conqueror.icon';
import { t110e3Icon } from './components/icon/files/tanks/t110e3.icon';
import { t95Fv4201ChieftainIcon } from './components/icon/files/tanks/t95_fv4201_chieftain.icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    protected title: string = 'app';

    constructor(
        private iconRegistry: IconRegistryService,
        private modeStore: ModeStore
    ) {
        this.registerIcons();
        this.onResize({});
    }

    @HostListener('window:resize', ['$event'])
    protected onResize(_event: any): void {
        if (window.innerWidth <= 425) {
            this.modeStore.set('mobile', true);
        } else {
            this.modeStore.set('mobile', false);
        }
    }

    private registerIcons(): void {
        this.iconRegistry.register([
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
            chargeurIcon,
            commandantIcon,
            operateurRadioIcon,
            piloteDeCharsIcon,
            tireurIcon,
        ]);
    }
}
