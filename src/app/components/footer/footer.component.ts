import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FooterInterface } from '../../commons/interfaces/footer.interface';
import { HeaderInterface } from '../../commons/interfaces/header.interface';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { InventoryService } from '../../commons/services/inventory.service';
import { WordingService } from '../../commons/services/wording.service';
import { FooterStore } from '../../commons/stores/footer.store';
import { HeaderStore } from '../../commons/stores/header.store';
import { MemberStore } from '../../commons/stores/member.store';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent implements OnDestroy {
    protected showHome: boolean;
    protected showTank: boolean;
    protected showWar: boolean;
    protected showChangelog: boolean;
    protected showAgreement: boolean;
    protected isVisitor: boolean;

    private headerSubscription: Subscription;
    private memberSubscribe: Subscription;
    private footerSubscribe: Subscription;

    constructor(
        protected inventory: InventoryService,
        protected wording: WordingService,
        private headerStore: HeaderStore,
        private memberStore: MemberStore,
        private footerStore: FooterStore
    ) {
        this.createSubscription();
    }

    ngOnDestroy(): void {
        this.headerSubscription.unsubscribe();
        this.memberSubscribe.unsubscribe();
        this.footerSubscribe.unsubscribe();
    }
    private createSubscription(): void {
        this.headerSubscription = this.headerStore
            .watch()
            .subscribe((headerInterface: HeaderInterface): void => {
                this.showHome = headerInterface.showHome;
                this.showTank = headerInterface.showTank;
                this.showWar = headerInterface.showWar;
            });

        this.memberSubscribe = this.memberStore
            .watch()
            .subscribe((memberInterface: MemberInterface): void => {
                this.isVisitor = memberInterface.isVisitor;
            });

        this.footerSubscribe = this.footerStore
            .watch()
            .subscribe((footerInterface: FooterInterface): void => {
                this.showAgreement = footerInterface.showAgreement;
                this.showChangelog = footerInterface.showChangelog;
            });
    }
}
