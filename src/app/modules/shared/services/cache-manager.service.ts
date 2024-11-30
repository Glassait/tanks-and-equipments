import { inject, Injectable, type StateKey, TransferState } from '@angular/core';

const cache: Map<string, { date: Date; data: unknown }> = new Map<string, { date: Date; data: unknown }>();

@Injectable({
    providedIn: 'root',
})
export class CacheManagerService {
    private readonly transferState = inject(TransferState);

    public addData(key: StateKey<unknown>, data: unknown) {
        if (cache.has(key)) {
            return;
        }

        this.transferState.set(key, data);
        cache.set(key, { date: new Date(), data });
    }

    public hasKey(key: StateKey<unknown>): boolean {
        return cache.has(key) || this.transferState.hasKey(key);
    }

    public getData<T>(key: StateKey<unknown>): T | undefined {
        let cacheData: { date: Date; data: unknown } | undefined = cache.get(key);

        if (!cacheData) {
            if (!this.transferState.hasKey(key)) {
                return undefined;
            }

            cacheData = { data: this.transferState.get(key, undefined), date: new Date() };
        }

        if (cacheData?.date && Date.now() - cacheData.date.getTime() > 1000 * 60 * 60) {
            cache.delete(key);
            cacheData = undefined;
        }

        this.transferState.set(key, cacheData?.data);
        return cacheData?.data as T;
    }
}
