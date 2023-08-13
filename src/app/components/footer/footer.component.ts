import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderInterface } from '../../commons/interfaces/header.interface';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { InventoryService } from '../../commons/services/inventory.service';
import { WordingService } from '../../commons/services/wording.service';
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
    protected isVisitor: boolean;

    private headerSubscription: Subscription;
    private memberSubscribe: Subscription;

    constructor(
        protected inventory: InventoryService,
        protected wording: WordingService,
        protected headerStore: HeaderStore,
        protected memberStore: MemberStore
    ) {
        this.createSubscription();
    }

    ngOnDestroy(): void {
        this.headerSubscription.unsubscribe();
        this.memberSubscribe.unsubscribe();
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
    }
}
