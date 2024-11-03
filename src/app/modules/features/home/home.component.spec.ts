import { ComponentFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { TankOverview } from 'generated-api/tanks';
import { WotNews } from 'generated-api/wot';
import { FoldResult } from 'generated-api/fold';
import { FoldNewsCardComponent, FoldTankCardComponent } from 'fold';
import { By } from '@angular/platform-browser';
import { TanksOverviewProxy } from 'shared/proxy/tanks-overview.proxy';
import { WotNewsProxy } from 'shared/proxy/wot-news.proxy';
import { FoldResultsProxy } from 'shared/proxy/fold-results.proxy';
import { of, throwError } from 'rxjs';

const TANKS_OVERVIEW_KEY = makeStateKey<TankOverview[]>('tankOverviews');
const WOT_NEWS_KEY = makeStateKey<WotNews[]>('wotNews');
const FOLD_RESULTS_KEY = makeStateKey<FoldResult[]>('foldResults');

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    let transferStateSpy: jasmine.SpyObj<TransferState>;
    let tanksOverviewServiceSpy: jasmine.SpyObj<TanksOverviewProxy>;
    let wotNewsServiceSpy: jasmine.SpyObj<WotNewsProxy>;
    let foldResultsServiceSpy: jasmine.SpyObj<FoldResultsProxy>;

    const tanksOverview: TankOverview[] = [
        {
            name: 'object 260',
            wotName: 'object 260',
            role: 'heavyPush',
            level: 10,
            type: 'heavy',
            nation: 'USSR',
            priority: 5,
            is_reward: true,
        },
        {
            name: 'object 260',
            wotName: 'object 260',
            role: 'heavyPush',
            level: 10,
            type: 'heavy',
            nation: 'USSR',
            priority: 1,
            is_reward: true,
        },
    ];
    const wotNews: WotNews[] = [
        {
            title: 'Titre',
            image_url: 'https://',
            url: 'https://',
            tags: ['Tags'],
        },
    ];
    const foldResults: FoldResult[] = [
        {
            description: 'Description',
            tag: 'Tag',
            image_url: 'https://',
        },
    ];

    describe('Browser', () => {
        beforeEach(() => {
            transferStateSpy = jasmine.createSpyObj('TransferState', ['get']);
            tanksOverviewServiceSpy = jasmine.createSpyObj('TanksOverviewProxy', ['tanksOverview']);
            wotNewsServiceSpy = jasmine.createSpyObj('WotNewsProxy', ['wotNews']);
            foldResultsServiceSpy = jasmine.createSpyObj('FoldResultsProxy', ['foldResults']);

            fixture = TestBed.configureTestingModule({
                imports: [HomeComponent, HttpClientTestingModule, FoldTankCardComponent, FoldNewsCardComponent],
                providers: [
                    {
                        provide: PLATFORM_ID,
                        useValue: 'browser',
                    },
                    {
                        provide: TransferState,
                        useValue: transferStateSpy,
                    },
                    {
                        provide: TanksOverviewProxy,
                        useValue: tanksOverviewServiceSpy,
                    },
                    {
                        provide: WotNewsProxy,
                        useValue: wotNewsServiceSpy,
                    },
                    {
                        provide: FoldResultsProxy,
                        useValue: foldResultsServiceSpy,
                    },
                ],
            }).createComponent(HomeComponent);

            transferStateSpy.get.withArgs(TANKS_OVERVIEW_KEY, []).and.returnValue(tanksOverview.filter(({ priority }) => priority === 5));
            transferStateSpy.get.withArgs(WOT_NEWS_KEY, []).and.returnValue(wotNews);
            transferStateSpy.get.withArgs(FOLD_RESULTS_KEY, []).and.returnValue(foldResults);

            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', (): void => {
            expect(component).toBeTruthy();
        });

        it('should have css classes', () => {
            expect(component.cssClasses.length).toEqual(2);
            expect(component.cssClasses[0]).toEqual('fold-grid');
            expect(component.cssClasses[1]).toEqual('gap-80');
        });

        it('should transfer state', () => {
            expect(transferStateSpy.get).toHaveBeenCalledTimes(3);
            expect(transferStateSpy.get).toHaveBeenCalledWith(TANKS_OVERVIEW_KEY, []);
            expect(transferStateSpy.get).toHaveBeenCalledWith(WOT_NEWS_KEY, []);
            expect(transferStateSpy.get).toHaveBeenCalledWith(FOLD_RESULTS_KEY, []);
        });

        it('should have 1 tank card', () => {
            const html = fixture.debugElement.query(By.css('#most-priority-tanks ul'));

            const debug = fixture.debugElement.query(By.directive(FoldTankCardComponent));
            const tankCard = debug.injector.get(FoldTankCardComponent);

            expect(html.children.length).toEqual(1);
            expect(html.children[0].nativeElement.localName).toEqual('li');
            expect(html.children[0].nativeElement.id).toEqual('fold-tank-1');

            expect(tankCard.name()).toEqual(tanksOverview[0].name);
            expect(tankCard.wotName()).toEqual(tanksOverview[0].wotName);
            expect(tankCard.nation()).toEqual(tanksOverview[0].nation);
            expect(tankCard.type()).toEqual(tanksOverview[0].type);
            expect(tankCard.role()).toEqual(tanksOverview[0].role);
            expect(tankCard.level()).toEqual(tanksOverview[0].level);
            expect(tankCard.priority()).toEqual(tanksOverview[0].priority);
            expect(tankCard.isReward()).toBeTrue();
        });

        it('should have 1 wot news', async () => {
            const defer = (await fixture.getDeferBlocks())[0];
            await defer.render(DeferBlockState.Complete);

            const html = fixture.debugElement.query(By.css('#wot-news ul'));

            const wotNewsCard = html.children[0].children[0].injector.get(FoldNewsCardComponent);

            expect(html.children.length).toEqual(1);
            expect(html.children[0].nativeElement.localName).toEqual('li');
            expect(html.children[0].nativeElement.id).toEqual('wot-news-1');

            expect(wotNewsCard.title()).toEqual(wotNews[0].title);
            expect(wotNewsCard.url()).toEqual(wotNews[0].url);
            expect(wotNewsCard.description()).toEqual('');
            expect(wotNewsCard.tags().length).toEqual(wotNews[0].tags.length);
            expect(wotNewsCard.imageUrl()).toEqual(wotNews[0].image_url);
            expect(wotNewsCard.isArticle()).toBeTrue();
        });

        it('should have 1 fold result', async () => {
            const defer = (await fixture.getDeferBlocks())[1];
            await defer.render(DeferBlockState.Complete);

            const html = fixture.debugElement.query(By.css('#about-us ul'));

            const wotNewsCard = html.children[0].children[0].injector.get(FoldNewsCardComponent);

            expect(html.children.length).toEqual(1);
            expect(html.children[0].nativeElement.localName).toEqual('li');
            expect(html.children[0].nativeElement.id).toEqual('about-us-1');

            expect(wotNewsCard.title()).toEqual('');
            expect(wotNewsCard.url()).toEqual('');
            expect(wotNewsCard.description()).toEqual(foldResults[0].description);
            expect(wotNewsCard.tags().length).toEqual(wotNews[0].tags.length);
            expect(wotNewsCard.imageUrl()).toEqual(wotNews[0].image_url);
            expect(wotNewsCard.isArticle()).toBeFalse();
        });

        it('should not have call api', () => {
            expect(tanksOverviewServiceSpy.tanksOverview).toHaveBeenCalledTimes(0);
            expect(wotNewsServiceSpy.wotNews).toHaveBeenCalledTimes(0);
            expect(foldResultsServiceSpy.foldResults).toHaveBeenCalledTimes(0);
        });
    });

    describe('Server', () => {
        beforeEach(() => {
            transferStateSpy = jasmine.createSpyObj('TransferState', ['set']);
            tanksOverviewServiceSpy = jasmine.createSpyObj('TanksOverviewProxy', ['tanksOverview']);
            wotNewsServiceSpy = jasmine.createSpyObj('WotNewsProxy', ['wotNews']);
            foldResultsServiceSpy = jasmine.createSpyObj('FoldResultsProxy', ['foldResults']);

            fixture = TestBed.configureTestingModule({
                imports: [HomeComponent, HttpClientTestingModule, FoldTankCardComponent, FoldNewsCardComponent],
                providers: [
                    {
                        provide: PLATFORM_ID,
                        useValue: 'server',
                    },
                    {
                        provide: TransferState,
                        useValue: transferStateSpy,
                    },
                    {
                        provide: TanksOverviewProxy,
                        useValue: tanksOverviewServiceSpy,
                    },
                    {
                        provide: WotNewsProxy,
                        useValue: wotNewsServiceSpy,
                    },
                    {
                        provide: FoldResultsProxy,
                        useValue: foldResultsServiceSpy,
                    },
                ],
            }).createComponent(HomeComponent);

            tanksOverviewServiceSpy.tanksOverview.and.returnValue(of(tanksOverview));
            wotNewsServiceSpy.wotNews.and.returnValue(of(wotNews));
            foldResultsServiceSpy.foldResults.and.returnValue(of(foldResults));

            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', (): void => {
            expect(component).toBeTruthy();
        });

        it('should have call api', () => {
            expect(tanksOverviewServiceSpy.tanksOverview).toHaveBeenCalledOnceWith();
            expect(wotNewsServiceSpy.wotNews).toHaveBeenCalledOnceWith();
            expect(foldResultsServiceSpy.foldResults).toHaveBeenCalledOnceWith();
        });

        it('should transfer state', () => {
            expect(transferStateSpy.set).toHaveBeenCalledTimes(3);
            expect(transferStateSpy.set).toHaveBeenCalledWith(
                TANKS_OVERVIEW_KEY,
                tanksOverview.filter(({ priority }) => priority === 5)
            );
            expect(transferStateSpy.set).toHaveBeenCalledWith(WOT_NEWS_KEY, wotNews);
            expect(transferStateSpy.set).toHaveBeenCalledWith(FOLD_RESULTS_KEY, foldResults);
        });
    });

    describe('Server Error', () => {
        beforeEach(() => {
            transferStateSpy = jasmine.createSpyObj('TransferState', ['set']);
            tanksOverviewServiceSpy = jasmine.createSpyObj('TanksOverviewProxy', ['tanksOverview']);
            wotNewsServiceSpy = jasmine.createSpyObj('WotNewsProxy', ['wotNews']);
            foldResultsServiceSpy = jasmine.createSpyObj('FoldResultsProxy', ['foldResults']);

            fixture = TestBed.configureTestingModule({
                imports: [HomeComponent, HttpClientTestingModule, FoldTankCardComponent, FoldNewsCardComponent],
                providers: [
                    {
                        provide: PLATFORM_ID,
                        useValue: 'server',
                    },
                    {
                        provide: TransferState,
                        useValue: transferStateSpy,
                    },
                    {
                        provide: TanksOverviewProxy,
                        useValue: tanksOverviewServiceSpy,
                    },
                    {
                        provide: WotNewsProxy,
                        useValue: wotNewsServiceSpy,
                    },
                    {
                        provide: FoldResultsProxy,
                        useValue: foldResultsServiceSpy,
                    },
                ],
            }).createComponent(HomeComponent);

            tanksOverviewServiceSpy.tanksOverview.and.returnValue(throwError(() => new Error()));
            wotNewsServiceSpy.wotNews.and.returnValue(throwError(() => new Error()));
            foldResultsServiceSpy.foldResults.and.returnValue(throwError(() => new Error()));

            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', (): void => {
            expect(component).toBeTruthy();
        });

        it('should have call api', () => {
            expect(tanksOverviewServiceSpy.tanksOverview).toHaveBeenCalledOnceWith();
            expect(wotNewsServiceSpy.wotNews).toHaveBeenCalledOnceWith();
            expect(foldResultsServiceSpy.foldResults).toHaveBeenCalledOnceWith();
        });

        it('should not transfer state', () => {
            expect(transferStateSpy.set).toHaveBeenCalledTimes(0);
        });
    });
});
