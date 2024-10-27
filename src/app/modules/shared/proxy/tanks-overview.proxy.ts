import { inject, Injectable } from '@angular/core';
import { type TankOverview, TanksOverviewService } from 'generated-api/tank';
import type { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TanksOverviewProxy {
    private readonly tanksOverviewService: TanksOverviewService = inject(TanksOverviewService);

    public tanksOverview(): Observable<TankOverview[]> {
        return this.tanksOverviewService.tanksOverview('body');
    }
}
