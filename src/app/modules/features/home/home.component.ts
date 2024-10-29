import { ChangeDetectionStrategy, Component, HostBinding, inject, makeStateKey, type OnInit, PLATFORM_ID } from '@angular/core';
import { FoldButtonComponent, FoldLinkDirective, FoldNewsCardComponent, FoldTankCardComponent, FoldTextComponent } from 'fold';
import { TanksOverviewProxy } from 'shared/proxy/tanks-overview.proxy';
import { isPlatformBrowser, isPlatformServer, JsonPipe, NgClass } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { PathEnum } from 'core/enums/path.enum';
import type { WotNews } from 'generated-api/wot';
import { WotNewsProxy } from 'shared/proxy/wot-news.proxy';
import type { TankOverview } from 'generated-api/tanks';
import type { FoldResult } from 'generated-api/fold';
import { FoldResultsProxy } from 'shared/proxy/fold-results.proxy';

const TANKS_OVERVIEW_KEY = makeStateKey<TankOverview[]>('tankOverviews');
const WOT_NEWS_KEY = makeStateKey<WotNews[]>('wotNews');
const FOLD_RESULTS_KEY = makeStateKey<FoldResult[]>('foldResults');

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldNewsCardComponent, JsonPipe, FoldTextComponent, FoldLinkDirective, FoldTankCardComponent, NgClass, FoldButtonComponent],
})
export class HomeComponent implements OnInit {
    @HostBinding('class')
    get cssClasses(): string[] {
        return ['fold-grid', 'gap-80'];
    }

    //region INJECTION
    private readonly tanksOverviewService: TanksOverviewProxy = inject(TanksOverviewProxy);
    private readonly wotNewsService: WotNewsProxy = inject(WotNewsProxy);
    private readonly foldResultsService: FoldResultsProxy = inject(FoldResultsProxy);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly transferState = inject(TransferState);
    //endregion

    protected readonly PathEnum = PathEnum;

    protected tanksOverview: TankOverview[] = [];
    protected wotNews: WotNews[] = [];
    protected foldResults: FoldResult[] = [];

    ngOnInit(): void {
        if (isPlatformServer(this.platformId)) {
            this.tanksOverviewService.tanksOverview().subscribe({
                next: (tankOverviews: TankOverview[]): void => {
                    this.tanksOverview = tankOverviews.filter(({ priority }): boolean => priority === 5);
                    this.transferState.set(TANKS_OVERVIEW_KEY, this.tanksOverview);
                },
                error: err => {
                    console.error(err);
                },
            });

            this.wotNewsService.wotNews().subscribe({
                next: (wotNews: WotNews[]): void => {
                    this.wotNews = wotNews;
                    this.transferState.set(WOT_NEWS_KEY, this.wotNews);
                },
                error: err => {
                    console.error(err);
                },
            });

            this.foldResultsService.foldResults().subscribe({
                next: (foldResults: FoldResult[]): void => {
                    this.foldResults = foldResults;
                    this.transferState.set(FOLD_RESULTS_KEY, this.foldResults);
                },
                error: err => {
                    console.error(err);
                },
            });
        }

        if (isPlatformBrowser(this.platformId)) {
            this.tanksOverview = this.transferState.get(TANKS_OVERVIEW_KEY, []);
            this.wotNews = this.transferState.get(WOT_NEWS_KEY, []);
            this.foldResults = this.transferState.get(FOLD_RESULTS_KEY, []);
        }
    }

    protected readonly require = require;
}
