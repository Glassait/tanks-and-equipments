import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ template: '' })
export class UnsubscribeComponent implements OnDestroy {
    private subscription: Subscription = new Subscription();

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    protected addSubscription(s: Subscription): void {
        this.subscription.add(s);
    }
}
