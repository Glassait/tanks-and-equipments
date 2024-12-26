import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FoldResultsProxy } from 'shared/proxy/fold-results.proxy';
import { of } from 'rxjs';
import { FoldResultService } from 'fold';

describe('Fold Results Proxy', () => {
    let service: FoldResultsProxy;

    let generatedService: jasmine.SpyObj<FoldResultService>;

    beforeEach(async () => {
        generatedService = jasmine.createSpyObj('FoldResultService', ['foldResult']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: FoldResultService,
                    useValue: generatedService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(FoldResultsProxy);
    });

    it('should call the generated service', () => {
        generatedService.foldResult.and.returnValue(of());
        expect(service.foldResults()).toBeDefined();
        expect(generatedService.foldResult).toHaveBeenCalledTimes(1);
    });
});
