import { Component } from '@angular/core';
import { FeatureInterface } from '../../commons/interfaces/feature.interface';
import { FooterInterface } from '../../commons/interfaces/footer.interface';
import { HeaderInterface } from '../../commons/interfaces/header.interface';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { InventoryService } from '../../commons/services/inventory.service';
import { WordingService } from '../../commons/services/wording.service';
import { FeatureStore } from '../../commons/stores/feature.store';
import { FooterStore } from '../../commons/stores/footer.store';
import { HeaderStore } from '../../commons/stores/header.store';
import { MemberStore } from '../../commons/stores/member.store';
import { UnsubscribeComponent } from '../commons/unsubscribe.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent extends UnsubscribeComponent {
    protected showHome: boolean;
    protected showTank: boolean;
    protected showWar: boolean;
    protected showChangelog: boolean;
    protected showAgreement: boolean;
    protected isVisitor: boolean;

    protected featureFlipping: FeatureInterface;

    constructor(
        protected inventory: InventoryService,
        protected wording: WordingService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private footerStore: FooterStore,
        private featureStore: FeatureStore
    ) {
        super();
        this.createSubscription();
    }

    private createSubscription(): void {
        this.addSubscription(
            this.headerStore
                .watch()
                .subscribe((headerInterface: HeaderInterface): void => {
                    this.showHome = headerInterface.showHome;
                    this.showTank = headerInterface.showTank;
                    this.showWar = headerInterface.showWar;
                })
        );

        this.addSubscription(
            this.memberStore
                .watch()
                .subscribe((memberInterface: MemberInterface): void => {
                    this.isVisitor = memberInterface.isVisitor;
                })
        );

        this.addSubscription(
            this.footerStore
                .watch()
                .subscribe((footerInterface: FooterInterface): void => {
                    this.showAgreement = footerInterface.showAgreement;
                    this.showChangelog = footerInterface.showChangelog;
                })
        );

        this.addSubscription(
            this.featureStore
                .watch()
                .subscribe((featureInterface: FeatureInterface): void => {
                    this.featureFlipping = featureInterface;
                })
        );
    }
}
