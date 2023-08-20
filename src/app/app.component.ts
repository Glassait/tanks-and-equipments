import { Component, HostListener, OnInit } from '@angular/core';
import { chargeurIcon } from './commons/icon/files/crews/chargeur.icon';
import { commandantIcon } from './commons/icon/files/crews/commandant.icon';
import { operateurRadioIcon } from './commons/icon/files/crews/operateur-radio.icon';
import { piloteDeCharsIcon } from './commons/icon/files/crews/pilote-de-chars.icon';
import { tireurIcon } from './commons/icon/files/crews/tireur.icon';
import { agreementIcon } from './commons/icon/files/other/agreement.icon';
import { castleIcon } from './commons/icon/files/other/castle.icon';
import { changelogIcon } from './commons/icon/files/other/changelog.icon';
import { informationIcon } from './commons/icon/files/other/information.icon';
import { mapIcon } from './commons/icon/files/other/map.icon';
import { okIcon } from './commons/icon/files/other/ok.icon';
import { pencilIcon } from './commons/icon/files/other/pencil.icon';
import { plusIcon } from './commons/icon/files/other/plus.icon';
import { redirectIcon } from './commons/icon/files/other/redirect.icon';
import { serverIcon } from './commons/icon/files/other/server.icon';
import { visitorIcon } from './commons/icon/files/other/visitor.icon';
import { wrenchIcon } from './commons/icon/files/other/wrench.icon';
import { amxM4Mle54Icon } from './commons/icon/files/tanks/amx_m4_mle54.icon';
import { cs63Icon } from './commons/icon/files/tanks/cs-63.icon';
import { is7Icon } from './commons/icon/files/tanks/is-7.icon';
import { kpz07pEIcon } from './commons/icon/files/tanks/kampfpanzer_07_p(e)';
import { leopard1Icon } from './commons/icon/files/tanks/leopard_1.icon';
import { object140Icon } from './commons/icon/files/tanks/object_140.icon';
import { object260Icon } from './commons/icon/files/tanks/object_260.icon';
import { object268version4Icon } from './commons/icon/files/tanks/object_268_version_4.icon';
import { object277Icon } from './commons/icon/files/tanks/object_277.icon';
import { object279EarlyIcon } from './commons/icon/files/tanks/object_279_early.icon';
import { object907Icon } from './commons/icon/files/tanks/object_907.icon';
import { panhardEbr105Icon } from './commons/icon/files/tanks/panhard_ebr_105.icon';
import { strv103bIcon } from './commons/icon/files/tanks/strv_103b.icon';
import { superConquerorIcon } from './commons/icon/files/tanks/super_conqueror.icon';
import { t110e3Icon } from './commons/icon/files/tanks/t110e3.icon';
import { t95Fv4201ChieftainIcon } from './commons/icon/files/tanks/t95_fv4201_chieftain.icon';
import { AuthenticationService } from './commons/services/authentication.service';
import { IconRegistryService } from './commons/services/icon-registry.service';
import { ModeStore } from './commons/stores/mode.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    protected title: string = 'app';

    constructor(
        private iconRegistry: IconRegistryService,
        private auth: AuthenticationService,
        private modeStore: ModeStore
    ) {
        this.registerIcons();
        this.onResize({});
    }

    ngOnInit(): void {
        if (!this.auth.isLoggedIn()) {
            this.auth.login();
        }
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
            panhardEbr105Icon,
            is7Icon,
            leopard1Icon,
            object140Icon,
            object260Icon,
            object268version4Icon,
            object277Icon,
            object279EarlyIcon,
            object907Icon,
            strv103bIcon,
            superConquerorIcon,
            t95Fv4201ChieftainIcon,
            t110e3Icon,
            kpz07pEIcon,
            chargeurIcon,
            commandantIcon,
            operateurRadioIcon,
            piloteDeCharsIcon,
            tireurIcon,
            wrenchIcon,
            pencilIcon,
            plusIcon,
            changelogIcon,
            informationIcon,
            serverIcon,
            visitorIcon,
            agreementIcon,
            redirectIcon,
        ]);
    }
}
