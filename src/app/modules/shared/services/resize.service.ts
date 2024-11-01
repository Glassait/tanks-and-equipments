import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class ResizeService {
    private readonly platformId = inject(PLATFORM_ID);

    public readonly isMobile = new BehaviorSubject<boolean>(false);
    public readonly isTablet = new BehaviorSubject<boolean>(false);
    public readonly isDesktop = new BehaviorSubject<boolean>(false);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.calculatedWindowsSize();

            fromEvent(window, 'resize')
                .pipe(takeUntilDestroyed())
                .subscribe((): void => this.calculatedWindowsSize());
        }
    }

    private calculatedWindowsSize(): void {
        this.isMobile.next(window.innerWidth < 426);
        this.isTablet.next(window.innerWidth < 1025);
        this.isDesktop.next(window.innerWidth >= 1025);
    }
}
