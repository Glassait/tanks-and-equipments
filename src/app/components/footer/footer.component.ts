import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
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

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent extends UnsubscribeDirective {
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
        this.headerStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((headerInterface: HeaderInterface): void => {
                this.showHome = headerInterface.showHome;
                this.showTank = headerInterface.showTank;
                this.showWar = headerInterface.showWar;
            });

        this.memberStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((memberInterface: MemberInterface): void => {
                this.isVisitor = memberInterface.isVisitor;
            });

        this.footerStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((footerInterface: FooterInterface): void => {
                this.showAgreement = footerInterface.showAgreement;
                this.showChangelog = footerInterface.showChangelog;
            });

        this.featureStore
            .watch()
            .pipe(takeUntil(this.destroy$))
            .subscribe((featureInterface: FeatureInterface): void => {
                this.featureFlipping = featureInterface;
            });
    }
}
