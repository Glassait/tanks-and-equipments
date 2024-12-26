import { inject, Injectable } from '@angular/core';
import { FoldResult, FoldResultService } from 'fold';
import type { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FoldResultsProxy {
    private readonly foldResultsService: FoldResultService = inject(FoldResultService);

    public foldResults(): Observable<FoldResult[]> {
        return this.foldResultsService.foldResult('body');
    }
}
