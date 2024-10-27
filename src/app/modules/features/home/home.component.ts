import { ChangeDetectionStrategy, Component, HostBinding, inject, makeStateKey, type OnInit, PLATFORM_ID } from '@angular/core';
import { FoldLinkDirective, FoldNewsCardComponent, FoldTankCardComponent, FoldTextComponent } from 'fold';
import { TanksOverviewProxy } from '../../shared/proxy/tanks-overview.proxy';
import { isPlatformBrowser, isPlatformServer, JsonPipe, NgClass } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import type { TankOverview } from 'generated-api/tank';
import { PathEnum } from 'core/enums/path.enum';

const dataKey = makeStateKey<{ data: string }>('data');

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldNewsCardComponent, JsonPipe, FoldTextComponent, FoldLinkDirective, FoldTankCardComponent, NgClass],
})
export class HomeComponent implements OnInit {
    @HostBinding('class')
    get cssClasses(): string[] {
        return ['fold-grid'];
    }

    //region INJECTION
    private readonly tanksOverviewService: TanksOverviewProxy = inject(TanksOverviewProxy);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly transferState = inject(TransferState);
    //endregion

    protected readonly PathEnum = PathEnum;

    protected tanksOverview: TankOverview[] = [];

    ngOnInit(): void {
        if (isPlatformServer(this.platformId)) {
            this.tanksOverviewService.tanksOverview().subscribe({
                next: (tankOverviews: TankOverview[]): void => {
                    this.tanksOverview = tankOverviews.filter(({ priority }): boolean => priority === 5);
                    this.transferState.set(dataKey, this.tanksOverview);
                },
                error: err => {
                    console.error(err);
                },
            });
        }

        if (isPlatformBrowser(this.platformId)) {
            this.tanksOverview = this.transferState.get(dataKey);
            console.log(this.tanksOverview);
        }
    }
}
