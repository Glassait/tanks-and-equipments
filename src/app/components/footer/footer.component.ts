import { Component } from '@angular/core';
import { takeWhile } from 'rxjs';
import { UnsubscribeDirective } from '../../commons/directives/unsubscribe.directive';
import { FeatureInterface } from '../../commons/interfaces/feature.interface';
import { MemberInterface } from '../../commons/interfaces/member.interface';
import { InventoryService } from '../../commons/services/inventory.service';
import { WordingService } from '../../commons/services/wording.service';
import { FeatureStore } from '../../commons/stores/feature.store';
import { MemberStore } from '../../commons/stores/member.store';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent extends UnsubscribeDirective {
    protected isVisitor: boolean;

    protected featureFlipping: FeatureInterface;

    constructor(
        protected inventory: InventoryService,
        protected wording: WordingService,
        private memberStore: MemberStore,
        private featureStore: FeatureStore
    ) {
        super();
        this.createSubscription();
    }

    private createSubscription(): void {
        this.memberStore
            .watch()
            .pipe(takeWhile((value: MemberInterface) => value !== null && value !== undefined))
            .subscribe((memberInterface: MemberInterface): void => {
                this.isVisitor = memberInterface.isVisitor;
            });

        this.featureStore
            .watch()
            .pipe(takeWhile((value: FeatureInterface) => value !== null && value !== undefined))
            .subscribe((featureInterface: FeatureInterface): void => {
                this.featureFlipping = featureInterface;
            });
    }
}
