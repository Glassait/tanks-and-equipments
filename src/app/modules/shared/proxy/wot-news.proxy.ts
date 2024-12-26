import { inject, Injectable } from '@angular/core';
import { WotNews, WotNewsService } from 'fold';
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
