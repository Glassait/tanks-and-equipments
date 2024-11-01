import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { FoldFooterComponent, FoldHeaderComponent } from 'fold';
import { Router } from '@angular/router';
import { ResizeService } from 'shared/services/resize.service';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    let router: Router;
    let resizeService: ResizeService;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [AppComponent, FoldHeaderComponent, FoldFooterComponent],
        }).createComponent(AppComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.inject(Router);
        resizeService = TestBed.inject(ResizeService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have header', () => {
        const headerDebug = fixture.debugElement.query(By.directive(FoldHeaderComponent));
        const headerHtml: HTMLElement = headerDebug.nativeElement;
        const header = headerDebug.injector.get(FoldHeaderComponent);

        expect(headerHtml).toBeDefined();
        expect(headerHtml.localName).toEqual('fold-header');
        expect(header.navigation().length).toEqual(3);
        expect(header.navigation()[0].text).toEqual('accueil');
        expect(header.navigation()[0].url).toEqual('/');
        expect(header.navigation()[0].openInNew).toBeUndefined();
    });

    it('should have footer', () => {
        const footerDebug = fixture.debugElement.query(By.directive(FoldFooterComponent));
        const footerHtml: HTMLElement = footerDebug.nativeElement;
        const footer = footerDebug.injector.get(FoldFooterComponent);

        expect(footerHtml).toBeDefined();
        expect(footerHtml.localName).toEqual('fold-footer');
        expect(footer.navigation().length).toEqual(2);
        expect(footer.navigation()[0].text).toEqual('accueil');
        expect(footer.navigation()[0].url).toEqual('/');
        expect(footer.navigation()[0].openInNew).toBeUndefined();
    });

    it('should not have gap-40', () => {
        const div = fixture.debugElement.query(By.css('gap-40'));
        expect(div).toBeNull();
    });

    it('should not have gap-40 when url is /', () => {
        spyOnProperty(router, 'url', 'get').and.returnValue('/');
        fixture.detectChanges();

        expect(component.cssClasses.length).toEqual(2);
        expect(component.cssClasses[0]).toEqual('body-interface');
        expect(component.cssClasses[1]).toEqual('');
    });

    it('should have gap-40 when url is not /', () => {
        spyOnProperty(router, 'url', 'get').and.returnValue('/url');
        fixture.detectChanges();

        expect(component.cssClasses.length).toEqual(2);
        expect(component.cssClasses[1]).toEqual('gap-40');
    });

    it('should not have gap-40 when isDesktop is true', () => {
        spyOnProperty(router, 'url', 'get').and.returnValue('/');
        resizeService.isDesktop.next(true);
        fixture.detectChanges();

        expect(component.cssClasses.length).toEqual(2);
        expect(component.cssClasses[0]).toEqual('body-interface');
        expect(component.cssClasses[1]).toEqual('');
    });

    it('should have gap-40 when url is / and isDesktop is fasle', () => {
        spyOnProperty(router, 'url', 'get').and.returnValue('/');
        resizeService.isDesktop.next(false);
        fixture.detectChanges();

        expect(component.cssClasses.length).toEqual(2);
        expect(component.cssClasses[1]).toEqual('gap-40');
    });

    it('should have router-outlet when isDesktop', () => {
        resizeService.isTablet.next(false);
        resizeService.isMobile.next(false);
        resizeService.isDesktop.next(true);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy();
    });

    it('should not have router-outlet when isTablet or isMobile', () => {
        resizeService.isTablet.next(true);
        resizeService.isMobile.next(false);
        resizeService.isDesktop.next(false);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('router-outlet'))).toBeNull();
        resizeService.isTablet.next(false);
        resizeService.isMobile.next(true);
        resizeService.isDesktop.next(false);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('router-outlet'))).toBeNull();
    });
});
