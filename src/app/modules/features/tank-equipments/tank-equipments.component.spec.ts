import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankEquipmentsComponent } from './tank-equipments.component';
import { TanksOverviewProxy } from 'shared/proxy/tanks-overview.proxy';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FoldSelectComponent } from 'fold';
import { PLATFORM_ID, TransferState } from '@angular/core';
import { TANKS_OVERVIEW_KEY } from 'shared/variables/transfer.key';
import { TankOverview, TankOverviewNationEnum, TankOverviewRoleEnum, TankOverviewTypeEnum } from 'generated-api/tanks';
import { By } from '@angular/platform-browser';
import { CacheManagerService } from 'shared/services/cache-manager.service';
import { of, throwError } from 'rxjs';

describe('TankEquipmentsComponent', () => {
    let component: TankEquipmentsComponent;
    let fixture: ComponentFixture<TankEquipmentsComponent>;

    let transferStateSpy: jasmine.SpyObj<TransferState>;
    let tanksOverviewServiceSpy: jasmine.SpyObj<TanksOverviewProxy>;
    let cacheManagerSpy: jasmine.SpyObj<CacheManagerService>;

    const tanksOverview: TankOverview[] = [
        {
            name: 'object 907',
            wotName: 'object 260',
            role: TankOverviewRoleEnum.Assault,
            level: 10,
            type: TankOverviewTypeEnum.TankDestroyer,
            nation: TankOverviewNationEnum.Czech,
            priority: 5,
            is_reward: true,
        },
        {
            name: 'object 260',
            wotName: 'object 260',
            role: TankOverviewRoleEnum.HeavyPush,
            level: 10,
            type: TankOverviewTypeEnum.Heavy,
            nation: TankOverviewNationEnum.Ussr,
            priority: 4,
            is_reward: true,
        },
        {
            name: 'bz-75',
            wotName: 'object 260',
            role: TankOverviewRoleEnum.Assault,
            level: 10,
            type: TankOverviewTypeEnum.TankDestroyer,
            nation: TankOverviewNationEnum.Czech,
            priority: 5,
            is_reward: true,
        },
        {
            name: '60Tp',
            wotName: 'object 260',
            role: TankOverviewRoleEnum.Sniper,
            level: 10,
            type: TankOverviewTypeEnum.Light,
            nation: TankOverviewNationEnum.Poland,
            priority: 4,
            is_reward: true,
        },
    ];

    describe('Browser', () => {
        beforeEach(() => {
            transferStateSpy = jasmine.createSpyObj('TransferState', ['get', 'set']);
            tanksOverviewServiceSpy = jasmine.createSpyObj('TanksOverviewProxy', ['tanksOverview']);

            fixture = TestBed.configureTestingModule({
                imports: [TankEquipmentsComponent, HttpClientTestingModule, FoldSelectComponent],
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
                ],
            }).createComponent(TankEquipmentsComponent);

            transferStateSpy.get.withArgs(TANKS_OVERVIEW_KEY, []).and.returnValue(tanksOverview);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', (): void => {
            expect(component).toBeTruthy();
        });

        it('should have 4 cards', () => {
            const div = fixture.debugElement.query(By.css('#tanks-carousel')).nativeElement;

            expect(div.children.length).toEqual(4);
        });

        it('should change carrousel on click on nation filter', () => {
            const debug = fixture.debugElement.query(By.css('fold-select[selectTitle="Nation"]'));
            const select = debug.injector.get(FoldSelectComponent);
            select.selectedItem.subscribe(value => {
                expect(value).toBe('Poland');
            });

            expect(select.selectItems().length).toEqual(4);

            const ul = fixture.debugElement.query(By.css('fold-select[selectTitle="Nation"] div ul')).nativeElement;
            const button = ul.children[1].children[0] as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
        });

        it('should change carrousel on click on level filter', () => {
            const debug = fixture.debugElement.query(By.css('fold-select[selectTitle="Tier"]'));
            const select = debug.injector.get(FoldSelectComponent);
            select.selectedItem.subscribe(value => {
                expect(value).toBe('10');
            });

            expect(select.selectItems().length).toEqual(2);

            const ul = fixture.debugElement.query(By.css('fold-select[selectTitle="Tier"] div ul')).nativeElement;
            const button = ul.children[1].children[0] as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
        });

        it('should change carrousel on click on type filter', () => {
            const debug = fixture.debugElement.query(By.css('fold-select[selectTitle="Type"]'));
            const select = debug.injector.get(FoldSelectComponent);
            select.selectedItem.subscribe(value => {
                expect(value).toBe('tankDestroyer');
            });

            expect(select.selectItems().length).toEqual(4);

            const ul = fixture.debugElement.query(By.css('fold-select[selectTitle="Type"] div ul')).nativeElement;
            const button = ul.children[1].children[0] as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
        });

        it('should change carrousel on click on priority filter', () => {
            const debug = fixture.debugElement.query(By.css('fold-select[selectTitle="Priorité"]'));
            const select = debug.injector.get(FoldSelectComponent);
            select.selectedItem.subscribe(value => {
                expect(value).toBe('5');
            });

            expect(select.selectItems().length).toEqual(3);

            const ul = fixture.debugElement.query(By.css('fold-select[selectTitle="Priorité"] div ul')).nativeElement;
            const button = ul.children[1].children[0] as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
        });

        it('should change carrousel on click on role filter', () => {
            const debug = fixture.debugElement.query(By.css('fold-select[selectTitle="Rôle"]'));
            const select = debug.injector.get(FoldSelectComponent);
            select.selectedItem.subscribe(value => {
                expect(value).toBe('assault');
            });

            expect(select.selectItems().length).toEqual(4);

            const ul = fixture.debugElement.query(By.css('fold-select[selectTitle="Rôle"] div ul')).nativeElement;
            const button = ul.children[1].children[0] as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
        });
    });

    describe('Server', () => {
        beforeEach(() => {
            cacheManagerSpy = jasmine.createSpyObj('CacheManagerService', ['addData', 'hasKey']);
            tanksOverviewServiceSpy = jasmine.createSpyObj('TanksOverviewProxy', ['tanksOverview']);

            fixture = TestBed.configureTestingModule({
                imports: [TankEquipmentsComponent, HttpClientTestingModule],
                providers: [
                    {
                        provide: PLATFORM_ID,
                        useValue: 'server',
                    },
                    {
                        provide: CacheManagerService,
                        useValue: cacheManagerSpy,
                    },
                    {
                        provide: TanksOverviewProxy,
                        useValue: tanksOverviewServiceSpy,
                    },
                ],
            }).createComponent(TankEquipmentsComponent);

            tanksOverviewServiceSpy.tanksOverview.and.returnValue(of(tanksOverview));

            cacheManagerSpy.hasKey.withArgs(TANKS_OVERVIEW_KEY).and.returnValue(false);

            cacheManagerSpy.addData.withArgs(TANKS_OVERVIEW_KEY, tanksOverview);

            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', (): void => {
            expect(component).toBeTruthy();
        });

        it('should have call api', () => {
            expect(tanksOverviewServiceSpy.tanksOverview).toHaveBeenCalledOnceWith();
        });

        it('should store data', () => {
            expect(cacheManagerSpy.addData).toHaveBeenCalledTimes(1);
            expect(cacheManagerSpy.addData).toHaveBeenCalledWith(TANKS_OVERVIEW_KEY, tanksOverview);
        });
    });

    describe('Server with cache', () => {
        beforeEach(() => {
            cacheManagerSpy = jasmine.createSpyObj('CacheManagerService', ['hasKey', 'getData']);
            tanksOverviewServiceSpy = jasmine.createSpyObj('TanksOverviewProxy', ['tanksOverview']);

            fixture = TestBed.configureTestingModule({
                imports: [TankEquipmentsComponent, HttpClientTestingModule],
                providers: [
                    {
                        provide: PLATFORM_ID,
                        useValue: 'server',
                    },
                    {
                        provide: CacheManagerService,
                        useValue: cacheManagerSpy,
                    },
                    {
                        provide: TanksOverviewProxy,
                        useValue: tanksOverviewServiceSpy,
                    },
                ],
            }).createComponent(TankEquipmentsComponent);

            cacheManagerSpy.hasKey.withArgs(TANKS_OVERVIEW_KEY).and.returnValue(true);

            cacheManagerSpy.getData.withArgs(TANKS_OVERVIEW_KEY).and.returnValue(tanksOverview);

            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', (): void => {
            expect(component).toBeTruthy();
        });

        it('should not have call api', () => {
            expect(tanksOverviewServiceSpy.tanksOverview).toHaveBeenCalledTimes(0);
        });

        it('should get data from cache', () => {
            expect(cacheManagerSpy.getData).toHaveBeenCalledTimes(1);
            expect(cacheManagerSpy.getData).toHaveBeenCalledWith(TANKS_OVERVIEW_KEY);
        });
    });

    describe('Server Error', () => {
        beforeEach(() => {
            cacheManagerSpy = jasmine.createSpyObj('CacheManagerService', ['addData', 'hasKey']);
            tanksOverviewServiceSpy = jasmine.createSpyObj('TanksOverviewProxy', ['tanksOverview']);

            fixture = TestBed.configureTestingModule({
                imports: [TankEquipmentsComponent, HttpClientTestingModule],
                providers: [
                    {
                        provide: PLATFORM_ID,
                        useValue: 'server',
                    },
                    {
                        provide: CacheManagerService,
                        useValue: cacheManagerSpy,
                    },
                    {
                        provide: TanksOverviewProxy,
                        useValue: tanksOverviewServiceSpy,
                    },
                ],
            }).createComponent(TankEquipmentsComponent);

            tanksOverviewServiceSpy.tanksOverview.and.returnValue(throwError(() => new Error()));

            cacheManagerSpy.hasKey.withArgs(TANKS_OVERVIEW_KEY).and.returnValue(false);

            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', (): void => {
            expect(component).toBeTruthy();
        });

        it('should have call api', () => {
            expect(tanksOverviewServiceSpy.tanksOverview).toHaveBeenCalledOnceWith();
        });

        it('should not add data to cache', () => {
            expect(cacheManagerSpy.addData).toHaveBeenCalledTimes(0);
        });
    });
});
