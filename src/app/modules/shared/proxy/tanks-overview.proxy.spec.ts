import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TanksOverviewProxy } from 'shared/proxy/tanks-overview.proxy';
import { TanksOverviewService } from 'generated-api/tanks';

describe('Tanks Overview Proxy', () => {
    let service: TanksOverviewProxy;

    let generatedService: jasmine.SpyObj<TanksOverviewService>;

    beforeEach(async () => {
        generatedService = jasmine.createSpyObj('TanksOverviewService', ['tanksOverview']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: TanksOverviewService,
                    useValue: generatedService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(TanksOverviewProxy);
    });

    it('should call the generated service', () => {
        generatedService.tanksOverview.and.returnValue(of());
        expect(service.tanksOverview()).toBeDefined();
        expect(generatedService.tanksOverview).toHaveBeenCalledTimes(1);
    });
});
