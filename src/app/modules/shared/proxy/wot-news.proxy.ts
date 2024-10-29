import { inject, Injectable } from '@angular/core';
import { type WotNews, WotNewsService } from 'generated-api/wot';
import type { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WotNewsProxy {
    private readonly wotNewsService: WotNewsService = inject(WotNewsService);

    public wotNews(): Observable<WotNews[]> {
        return this.wotNewsService.wotNews('body');
    }
}
