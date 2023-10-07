import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This directive manage the subscription
 * @example How to use : add `.pipe(takeUntil(this.destroy$))` before the `.subscribe()`
 */
@Directive()
export class UnsubscribeComponent implements OnDestroy {
    /**
     * The object that follow the subscription, etc
     * @protected
     */
    protected destroy$: Subject<void> = new Subject<void>();

    /**
     * The implementation of the {@link OnDestroy} interface
     */
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
