import { CacheManagerService } from 'shared/services/cache-manager.service';
import { TestBed } from '@angular/core/testing';
import { makeStateKey, TransferState } from '@angular/core';

describe('CacheManageService', () => {
    let cacheManagerService: CacheManagerService;
    let transferStateSpy: jasmine.SpyObj<TransferState>;

    beforeEach(() => {
        transferStateSpy = jasmine.createSpyObj('TransferState', ['set', 'get', 'hasKey']);

        TestBed.configureTestingModule({
            providers: [
                CacheManagerService,
                {
                    provide: TransferState,
                    useValue: transferStateSpy,
                },
            ],
        });

        cacheManagerService = TestBed.inject(CacheManagerService);
    });

    it('should create', () => {
        expect(cacheManagerService).toBeTruthy();
    });

    it('should has key after adding data to cache', () => {
        const key = makeStateKey('uniqueKey1');

        transferStateSpy.hasKey.withArgs(key).and.returnValue(false);

        expect(cacheManagerService.hasKey(key)).toBeFalse();
        expect(cacheManagerService.getData(key)).toBeUndefined();

        cacheManagerService.addData(key, 'test');

        expect(cacheManagerService.hasKey(key)).toBeTrue();
        expect(cacheManagerService.getData(key)).toEqual('test');
    });

    it('should not add when already have data', () => {
        const key = makeStateKey('uniqueKey2');
        cacheManagerService.addData(key, 'test');
        expect(transferStateSpy.set).toHaveBeenCalledTimes(1);
        cacheManagerService.addData(key, 'test');
        expect(transferStateSpy.set).toHaveBeenCalledTimes(1);
    });

    it('should retrieve data from transferState when cache is empty', () => {
        const key = makeStateKey('uniqueKey3');

        transferStateSpy.hasKey.withArgs(key).and.returnValue(true);
        transferStateSpy.get.withArgs(key, undefined).and.returnValue('test');

        const data = cacheManagerService.getData(key);
        expect(transferStateSpy.set).toHaveBeenCalledOnceWith(key, 'test');
        expect(data).toEqual('test');
    });

    it('should delete cache when date is to old', () => {
        const key = makeStateKey('uniqueKey4');
        cacheManagerService.addData(key, 'test');

        const fakeDate = new Date();
        fakeDate.setFullYear(fakeDate.getFullYear() + 2, 1, 1);

        spyOn(Date, 'now').and.callFake(() => fakeDate.getTime());
        const data = cacheManagerService.getData(key);
        expect(data).toBeUndefined();
        expect(transferStateSpy.hasKey).toHaveBeenCalledTimes(0);
        expect(transferStateSpy.set).toHaveBeenCalledTimes(2);
    });
});
