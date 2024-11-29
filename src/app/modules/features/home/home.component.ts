import { ChangeDetectionStrategy, Component, HostBinding, inject, type OnInit, PLATFORM_ID } from '@angular/core';
import { FoldButtonComponent, FoldLinkDirective, FoldNewsCardComponent, FoldTankCardComponent, FoldTextComponent } from 'fold';
import { TanksOverviewProxy } from 'shared/proxy/tanks-overview.proxy';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { PathEnum } from 'core/enums/path.enum';
import type { WotNews } from 'generated-api/wot';
import { WotNewsProxy } from 'shared/proxy/wot-news.proxy';
import type { TankOverview } from 'generated-api/tanks';
import type { FoldResult } from 'generated-api/fold';
import { FoldResultsProxy } from 'shared/proxy/fold-results.proxy';
import { FOLD_RESULTS_KEY, TANKS_OVERVIEW_KEY, WOT_NEWS_KEY } from 'shared/variables/transfer.key';
import { CacheManagerService } from 'shared/services/cache-manager.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldNewsCardComponent, FoldTextComponent, FoldLinkDirective, FoldTankCardComponent, NgClass, FoldButtonComponent],
})
export class HomeComponent implements OnInit {
    @HostBinding('class')
    public get cssClasses(): string[] {
        return ['fold-grid', 'gap-80'];
    }

    //region INJECTION
    private readonly tanksOverviewService: TanksOverviewProxy = inject(TanksOverviewProxy);
    private readonly wotNewsService: WotNewsProxy = inject(WotNewsProxy);
    private readonly foldResultsService: FoldResultsProxy = inject(FoldResultsProxy);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly transferState = inject(TransferState);
    private readonly cacheManager = inject(CacheManagerService);
    //endregion

    protected readonly PathEnum = PathEnum;

    protected tanksOverview: TankOverview[] = [];
    protected wotNews: WotNews[] = [];
    protected foldResults: FoldResult[] = [];

    ngOnInit(): void {
        if (this.cacheManager.hasKey(TANKS_OVERVIEW_KEY)) {
            this.tanksOverview = this.filterTanksOverview(this.cacheManager.getData(TANKS_OVERVIEW_KEY)!);
        } else {
            this.tanksOverviewService.tanksOverview().subscribe({
                next: (tanksOverview: TankOverview[]): void => {
                    this.tanksOverview = this.filterTanksOverview(tanksOverview);
                    this.cacheManager.addData(TANKS_OVERVIEW_KEY, tanksOverview);
                },
                error: err => {
                    console.error(err);
                },
            });
        }

        if (this.cacheManager.hasKey(WOT_NEWS_KEY)) {
            this.wotNews = this.cacheManager.getData(WOT_NEWS_KEY)!;
        } else {
            this.wotNewsService.wotNews().subscribe({
                next: (wotNews: WotNews[]): void => {
                    this.wotNews = wotNews;
                    this.cacheManager.addData(WOT_NEWS_KEY, wotNews);
                },
                error: err => {
                    console.error(err);
                },
            });
        }

        if (this.cacheManager.hasKey(FOLD_RESULTS_KEY)) {
            this.foldResults = this.cacheManager.getData(FOLD_RESULTS_KEY)!;
        } else {
            this.foldResultsService.foldResults().subscribe({
                next: (foldResults: FoldResult[]): void => {
                    this.foldResults = foldResults;
                    this.cacheManager.addData(FOLD_RESULTS_KEY, foldResults);
                },
                error: err => {
                    console.error(err);
                },
            });
        }

        if (isPlatformBrowser(this.platformId)) {
            this.tanksOverview = this.filterTanksOverview(this.transferState.get(TANKS_OVERVIEW_KEY, []));
            this.wotNews = this.transferState.get(WOT_NEWS_KEY, []);
            this.foldResults = this.transferState.get(FOLD_RESULTS_KEY, []);
        }
    }

    private filterTanksOverview(tanksOverview: TankOverview[]) {
        return tanksOverview.filter(({ priority }: TankOverview): boolean => priority === 5);
    }
}
