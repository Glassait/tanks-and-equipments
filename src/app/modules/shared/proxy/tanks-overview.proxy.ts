import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { TankOverview, TanksOverviewService } from 'fold';

@Injectable({
    providedIn: 'root',
})
export class TanksOverviewProxy {
    private readonly tanksOverviewService: TanksOverviewService = inject(TanksOverviewService);

    public tanksOverview(): Observable<TankOverview[]> {
        return this.tanksOverviewService.tanksOverview('body');
    }
}
