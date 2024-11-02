import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { WotNewsService } from 'generated-api/wot';
import { WotNewsProxy } from 'shared/proxy/wot-news.proxy';

describe('Tanks Overview Proxy', () => {
    let service: WotNewsProxy;

    let generatedService: jasmine.SpyObj<WotNewsService>;

    beforeEach(async () => {
        generatedService = jasmine.createSpyObj('WotNewsService', ['wotNews']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: WotNewsService,
                    useValue: generatedService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(WotNewsProxy);
    });

    it('should call the generated service', () => {
        generatedService.wotNews.and.returnValue(of());
        expect(service.wotNews()).toBeDefined();
        expect(generatedService.wotNews).toHaveBeenCalledTimes(1);
    });
});
