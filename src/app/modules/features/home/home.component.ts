import { ChangeDetectionStrategy, Component, HostBinding, inject, type OnInit, PLATFORM_ID } from '@angular/core';
import {
    FoldButtonComponent,
    FoldLinkDirective,
    FoldNewsCardComponent, FoldResult,
    FoldTankCardComponent,
    FoldTextComponent,
    TankOverview, WotNews,
} from 'fold';
import { TanksOverviewProxy } from 'shared/proxy/tanks-overview.proxy';
import { isPlatformBrowser, isPlatformServer, NgClass } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { PathEnum } from 'core/enums/path.enum';
import { WotNewsProxy } from 'shared/proxy/wot-news.proxy';
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
        if (isPlatformServer(this.platformId)) {
            this.getTanksOverviewData();
            this.getWotNewsData();
            this.getFoldResultsData();

            return;
        }

        if (isPlatformBrowser(this.platformId)) {
            const today = new Date();

            if ([10, 11].includes(today.getMonth())) {
                document.getElementsByTagName('html')?.item(0)?.classList.add('christmas');
            }

            this.tanksOverview = this.filterTanksOverview(this.transferState.get(TANKS_OVERVIEW_KEY, []));
            this.wotNews = this.transferState.get(WOT_NEWS_KEY, []);
            this.foldResults = this.transferState.get(FOLD_RESULTS_KEY, []);
        }
    }

    private getFoldResultsData(): void {
        if (this.cacheManager.hasKey(FOLD_RESULTS_KEY)) {
            this.foldResults = this.cacheManager.getData(FOLD_RESULTS_KEY)!;
            return;
        }

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

    private getWotNewsData(): void {
        if (this.cacheManager.hasKey(WOT_NEWS_KEY)) {
            this.wotNews = this.cacheManager.getData(WOT_NEWS_KEY)!;
            return;
        }

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

    private getTanksOverviewData(): void {
        if (this.cacheManager.hasKey(TANKS_OVERVIEW_KEY)) {
            this.tanksOverview = this.filterTanksOverview(this.cacheManager.getData(TANKS_OVERVIEW_KEY)!);
            return;
        }

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

    private filterTanksOverview(tanksOverview: TankOverview[]) {
        return tanksOverview.filter(({ priority }: TankOverview): boolean => priority === 5);
    }
}
