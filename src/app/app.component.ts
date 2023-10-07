import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieNameEnum } from './commons/enums/cookie-name.enum';
import { FeatureInterface } from './commons/interfaces/feature.interface';
import { AuthenticationService } from './commons/services/authentication.service';
import { FeatureFlippingService } from './commons/services/feature-flipping.service';
import { IconRegistryService } from './commons/services/icon-registry.service';
import { FeatureStore } from './commons/stores/feature.store';
import { ModeStore } from './commons/stores/mode.store';
import { DateCustom } from './commons/utils/date.custom';
import { chargeurIcon } from './components/icon/files/crews/chargeur.icon';
import { commandantIcon } from './components/icon/files/crews/commandant.icon';
import { operateurRadioIcon } from './components/icon/files/crews/operateur-radio.icon';
import { piloteDeCharsIcon } from './components/icon/files/crews/pilote-de-chars.icon';
import { tireurIcon } from './components/icon/files/crews/tireur.icon';
import { agreementIcon } from './components/icon/files/other/agreement.icon';
import { castleIcon } from './components/icon/files/other/castle.icon';
import { changelogIcon } from './components/icon/files/other/changelog.icon';
import { informationIcon } from './components/icon/files/other/information.icon';
import { koIcon } from './components/icon/files/other/ko.icon';
import { mapIcon } from './components/icon/files/other/map.icon';
import { okIcon } from './components/icon/files/other/ok.icon';
import { pencilIcon } from './components/icon/files/other/pencil.icon';
import { plusIcon } from './components/icon/files/other/plus.icon';
import { redirectIcon } from './components/icon/files/other/redirect.icon';
import { reserveIcon } from './components/icon/files/other/reserve.icon';
import { sendIcon } from './components/icon/files/other/send.icon';
import { serverIcon } from './components/icon/files/other/server.icon';
import { userGroupIcon } from './components/icon/files/other/use-group.icon';
import { visitorIcon } from './components/icon/files/other/visitor.icon';
import { waitingIcon } from './components/icon/files/other/waiting.icon';
import { wrenchIcon } from './components/icon/files/other/wrench.icon';
import { amxM4Mle54Icon } from './components/icon/files/tanks/amx_m4_mle54.icon';
import { cs63Icon } from './components/icon/files/tanks/cs-63.icon';
import { is7Icon } from './components/icon/files/tanks/is-7.icon';
import { kpz07pEIcon } from './components/icon/files/tanks/kampfpanzer_07_p(e)';
import { leopard1Icon } from './components/icon/files/tanks/leopard_1.icon';
import { object140Icon } from './components/icon/files/tanks/object_140.icon';
import { object260Icon } from './components/icon/files/tanks/object_260.icon';
import { object268version4Icon } from './components/icon/files/tanks/object_268_version_4.icon';
import { object277Icon } from './components/icon/files/tanks/object_277.icon';
import { object279EarlyIcon } from './components/icon/files/tanks/object_279_early.icon';
import { object907Icon } from './components/icon/files/tanks/object_907.icon';
import { panhardEbr105Icon } from './components/icon/files/tanks/panhard_ebr_105.icon';
import { strv103bIcon } from './components/icon/files/tanks/strv_103b.icon';
import { superConquerorIcon } from './components/icon/files/tanks/super_conqueror.icon';
import { t110e3Icon } from './components/icon/files/tanks/t110e3.icon';
import { t95Fv4201ChieftainIcon } from './components/icon/files/tanks/t95_fv4201_chieftain.icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    protected title: string = 'app';

    private featureFlipping: FeatureInterface;

    constructor(
        private iconRegistry: IconRegistryService,
        private auth: AuthenticationService,
        private featureService: FeatureFlippingService,
        private cookie: CookieService,
        private modeStore: ModeStore,
        private featureStore: FeatureStore
    ) {
        if (!this.auth.isLoggedIn()) {
            this.auth.login();
        }
        this.registerIcons();
        this.onResize({});
    }

    ngOnInit(): void {
        this.getFeature();
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
            reserveIcon,
            userGroupIcon,
            koIcon,
            waitingIcon,
            sendIcon,
        ]);
    }

    private getFeature(): void {
        const cookie: string = this.cookie.get(CookieNameEnum.FEATURE);
        if (cookie) {
            this.featureStore.patch(JSON.parse(cookie));
            return;
        }

        this.featureService.queryFeature().subscribe({
            next: (value: FeatureInterface): void => {
                this.featureStore.patch(value);
                this.featureFlipping = value;
            },
            error: err => {
                console.log(err);
            },
            complete: (): void => {
                this.cookie.set(
                    CookieNameEnum.FEATURE,
                    JSON.stringify(this.featureFlipping),
                    DateCustom.getMidnightDate()
                );
            },
        });
    }
}
