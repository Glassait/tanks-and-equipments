import { TestBed } from '@angular/core/testing';
import { ResizeService } from './resize.service';
import { PLATFORM_ID } from '@angular/core';

describe('ResizeService', () => {
    let service: ResizeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ResizeService,
                { provide: PLATFORM_ID, useValue: 'browser' }, // Mocking PLATFORM_ID as 'browser'
            ],
        });

        // Instantiate the service
        service = TestBed.inject(ResizeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set initial values for mobile, tablet, and desktop based on window.innerWidth', () => {
        // Mock the window.innerWidth
        Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
        service['calculatedWindowsSize']();

        expect(service.isMobile.value).toBe(false);
        expect(service.isTablet.value).toBe(true);
        expect(service.isDesktop.value).toBe(false);
    });

    describe('calculatedWindowsSize', () => {
        it('should update isMobile, isTablet, and isDesktop based on window width < 426', () => {
            Object.defineProperty(window, 'innerWidth', { writable: true, value: 400 });
            service['calculatedWindowsSize']();

            expect(service.isMobile.value).toBe(true);
            expect(service.isTablet.value).toBe(true);
            expect(service.isDesktop.value).toBe(false);
        });

        it('should update isMobile, isTablet, and isDesktop based on window width < 1025 but >= 426', () => {
            Object.defineProperty(window, 'innerWidth', { writable: true, value: 768 });
            service['calculatedWindowsSize']();

            expect(service.isMobile.value).toBe(false);
            expect(service.isTablet.value).toBe(true);
            expect(service.isDesktop.value).toBe(false);
        });

        it('should update isMobile, isTablet, and isDesktop based on window width >= 1025', () => {
            Object.defineProperty(window, 'innerWidth', { writable: true, value: 1200 });
            service['calculatedWindowsSize']();

            expect(service.isMobile.value).toBe(false);
            expect(service.isTablet.value).toBe(false);
            expect(service.isDesktop.value).toBe(true);
        });
    });

    it('should trigger calculatedWindowsSize on window resize', () => {
        // Spy on `calculatedWindowsSize` to check if it gets called
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resizeSpy = spyOn(service as any, 'calculatedWindowsSize').and.callThrough();
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);

        expect(resizeSpy).toHaveBeenCalled();
    });
});
