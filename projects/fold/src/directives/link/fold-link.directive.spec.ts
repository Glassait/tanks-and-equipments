// eslint-disable-next-line max-classes-per-file
import { FoldLinkDirective } from './fold-link.directive';
import { Component, DebugElement } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';

@Component({
    template: `<a fold-link [url]="url" [disabled]="disabled" [openInNew]="openInNew">Je suis un lien</a>`,
    imports: [FoldLinkDirective],
    standalone: true,
})
class MockAnchorComponent {
    url: string;
    disabled: boolean;
    openInNew: boolean;
}

@Component({
    template: `<button fold-link [url]="url" [disabled]="disabled" [openInNew]="openInNew">Je suis un lien</button>`,
    imports: [FoldLinkDirective],
    standalone: true,
})
class MockButtonComponent {
    url: string;
    disabled: boolean;
    openInNew: boolean;
}

describe('FoldLinkDirective', () => {
    describe('In anchor', () => {
        let fixture: ComponentFixture<MockAnchorComponent>;
        let componentWrapper: MockAnchorComponent;
        let directiveDebug: DebugElement;
        let directiveInstance: FoldLinkDirective;
        let directiveHtml: HTMLAnchorElement;

        let routerSpy: jasmine.SpyObj<Router>;
        let windowOpenSpy: jasmine.Spy;

        beforeEach(() => {
            routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
            windowOpenSpy = spyOn(window, 'open');

            fixture = TestBed.configureTestingModule({
                imports: [MockAnchorComponent],
                providers: [{ provide: Router, useValue: routerSpy }],
            }).createComponent(MockAnchorComponent);

            componentWrapper = fixture.componentInstance;
            fixture.detectChanges();

            directiveDebug = fixture.debugElement.query(By.directive(FoldLinkDirective));
            directiveInstance = directiveDebug.componentInstance;
            directiveHtml = directiveDebug.nativeElement;
        });

        it('should create', () => {
            expect(directiveInstance).toBeTruthy();
        });

        it('should have disabled=false and openInNew=false by default', () => {
            expect(directiveInstance.openInNew).toBeFalsy();
            expect(directiveInstance.disabled).toBeFalsy();
        });

        it('should have href when url has http(s)', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('https://search.brave.com/');
            expect(directiveHtml.href).toEqual('https://search.brave.com/');
            expect(directiveHtml.href.startsWith('http')).toBeTrue();
        });

        it('should not have href when url has not http(s)', () => {
            componentWrapper.url = '/test';
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('/test');
            expect(directiveHtml.href).toEqual('');
            expect(directiveHtml.href.startsWith('http')).toBeFalse();
        });

        it('should not have href when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.href).toEqual('');
        });

        it('should have target=_blank when openInNew=true and url has http(s)', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.target).toEqual('_blank');
            expect(directiveHtml.href.startsWith('http')).toBeTrue();
        });

        it('should not have target=_blank when openInNew=false', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = false;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeFalse();
            expect(directiveHtml.target).toEqual('');
        });

        it('should not have target=_blank when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.target).toEqual('');
        });

        it('should not have target=_blank when url not http(s) even if openInNew = true', () => {
            componentWrapper.url = '/test';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('/test');
            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.href).toEqual('');
            expect(directiveHtml.target).toEqual('');
        });

        it('should have rel=noreferrer when openInNew=true', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.rel).toEqual('noreferrer');
        });

        it('should not have rel=noreferrer when openInNew=false', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = false;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeFalse();
            expect(directiveHtml.rel).toEqual('');
        });

        it('should not have rel=noreferrer when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.rel).toEqual('');
        });

        it('should not have rel=noreferrer when url not http(s) even is openInNew=true', () => {
            componentWrapper.url = '/test';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('/test');
            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.href).toEqual('');
            expect(directiveHtml.rel).toEqual('');
        });

        it('should not be disabled by default', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeFalsy();
            expect(directiveHtml.attributes.getNamedItem('disabled')?.value).toBeUndefined();
        });

        it('should have attr disabled when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.attributes.getNamedItem('disabled')?.value).toEqual('true');
        });

        it('should not be aria-hidden by default', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveHtml.ariaHidden).toBeNull();
        });

        it('should have aria-hidden when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.ariaHidden).toEqual('true');
        });

        it('should have tabindex=0 by default', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveHtml.tabIndex).toEqual(0);
        });

        it('should have tabindex=-1 when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.tabIndex).toEqual(-1);
        });

        it('should not open nor navigate when anchor', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            spyOn(directiveHtml, 'click').and.stub();
            directiveHtml.click();
            expect(directiveHtml.click).toHaveBeenCalledTimes(1);
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);

            directiveDebug.triggerEventHandler('click', new MouseEvent('click'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);
        });

        it('should not open nor navigate when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();

            spyOn(directiveHtml, 'click').and.stub();
            directiveHtml.click();
            expect(directiveHtml.click).toHaveBeenCalledTimes(1);
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);

            directiveDebug.triggerEventHandler('click', new MouseEvent('click'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);
        });

        it('should navigate when url not http(s) on click', () => {
            componentWrapper.url = '/test';
            fixture.detectChanges();

            routerSpy.navigateByUrl.withArgs('/test').and.returnValue(lastValueFrom(of(true)));
            directiveHtml.click();
            expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/test');

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledTimes(0);
            });
        });

        it("should throw error when angular url doesn't exist on click", () => {
            componentWrapper.url = '/not-exist';
            fixture.detectChanges();

            routerSpy.navigateByUrl.withArgs('/not-exist').and.returnValue(Promise.reject('Does not exist'));
            directiveHtml.click();
            expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/not-exist');

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledOnceWith('Does not exist');
            });
        });

        it('should navigate when url has not http(s) by pressing enter', () => {
            componentWrapper.url = '/test';
            fixture.detectChanges();

            routerSpy.navigateByUrl.withArgs('/test').and.returnValue(lastValueFrom(of(true)));
            directiveDebug.triggerEventHandler('keydown.enter', new KeyboardEvent('enter'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/test');

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('In button', () => {
        let fixture: ComponentFixture<MockButtonComponent>;
        let componentWrapper: MockButtonComponent;
        let directiveDebug: DebugElement;
        let directiveInstance: FoldLinkDirective;
        let directiveHtml: HTMLButtonElement & { href: string; target: number; rel: string };

        let routerSpy: jasmine.SpyObj<Router>;
        let windowOpenSpy: jasmine.Spy;

        beforeEach(() => {
            routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
            windowOpenSpy = spyOn(window, 'open');

            fixture = TestBed.configureTestingModule({
                imports: [MockButtonComponent],
                providers: [{ provide: Router, useValue: routerSpy }],
            }).createComponent(MockButtonComponent);

            componentWrapper = fixture.componentInstance;
            fixture.detectChanges();

            directiveDebug = fixture.debugElement.query(By.directive(FoldLinkDirective));
            directiveInstance = directiveDebug.componentInstance;
            directiveHtml = directiveDebug.nativeElement;
        });

        it('should create', () => {
            expect(directiveInstance).toBeTruthy();
        });

        it('should have disabled false and open in new falsy by default', () => {
            expect(directiveInstance.openInNew).toBeFalsy();
            expect(directiveInstance.disabled).toBeFalsy();
        });

        it('should not have href even when url is http(s)', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('https://search.brave.com/');
            expect(directiveHtml.href).toBeUndefined();
        });

        it('should not have href when url is not http(s)', () => {
            componentWrapper.url = '/test';
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('/test');
            expect(directiveHtml.href).toBeUndefined();
        });

        it('should not have href when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('https://search.brave.com/');
            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.href).toBeUndefined();
        });

        it('should not have target=_blank even when openInNew=true', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.target).toBeUndefined();
        });

        it('should not have target=_blank when openInNew=false', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = false;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeFalse();
            expect(directiveHtml.target).toBeUndefined();
        });

        it('should not have target=_blank when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.target).toBeUndefined();
        });

        it('should not have target=_blank when url has not http(s)', () => {
            componentWrapper.url = '/test';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('/test');
            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.href).toBeUndefined();
            expect(directiveHtml.target).toBeUndefined();
        });

        it('should not have rel=noreferrer even when openInNew=true', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.rel).toBeUndefined();
        });

        it('should not have rel=noreferrer when openInNew=false', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = false;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeFalse();
            expect(directiveHtml.rel).toBeUndefined();
        });

        it('should not have rel=noreferrer when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.rel).toBeUndefined();
        });

        it('should not have rel=noreferrer when url has not http(s)', () => {
            componentWrapper.url = '/test';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('/test');
            expect(directiveInstance.openInNew).toBeTrue();
            expect(directiveHtml.href).toBeUndefined();
            expect(directiveHtml.rel).toBeUndefined();
        });

        it('should not be disabled by default', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeFalsy();
            expect(directiveHtml.attributes.getNamedItem('disabled')?.value).toBeUndefined();
        });

        it('should have attr disabled when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.attributes.getNamedItem('disabled')?.value).toEqual('true');
        });

        it('should not be aria-hidden by default', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeFalsy();
            expect(directiveHtml.ariaHidden).toBeNull();
        });

        it('should have aria-hidden when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.ariaHidden).toEqual('true');
        });

        it('should have tabindex=0 by default', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            expect(directiveHtml.tabIndex).toEqual(0);
        });

        it('should have tabindex=-1 when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();
            expect(directiveHtml.tabIndex).toEqual(-1);
        });

        it('should not open nor navigate when disabled', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.disabled = true;
            fixture.detectChanges();

            expect(directiveInstance.disabled).toBeTrue();

            spyOn(directiveHtml, 'click').and.stub();
            directiveHtml.click();
            expect(directiveHtml.click).toHaveBeenCalledTimes(1);
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);

            directiveDebug.triggerEventHandler('click', new MouseEvent('click'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);
        });

        it('should open when url has http(s) on click', () => {
            componentWrapper.url = 'https://search.brave.com/';
            fixture.detectChanges();

            windowOpenSpy.and.stub();

            directiveDebug.triggerEventHandler('click', new MouseEvent('click'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledOnceWith('https://search.brave.com/', '_self');

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledTimes(0);
            });
        });

        it('should open in new when url has http(s) and openInNew=true on click', () => {
            componentWrapper.url = 'https://search.brave.com/';
            componentWrapper.openInNew = true;
            fixture.detectChanges();

            expect(directiveInstance.openInNew).toBeTrue();

            windowOpenSpy.and.stub();

            directiveDebug.triggerEventHandler('click', new MouseEvent('click'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
            expect(windowOpenSpy).toHaveBeenCalledOnceWith('https://search.brave.com/', '_blank');

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledTimes(0);
            });
        });

        it('should navigate when url has not http(s) on click', () => {
            componentWrapper.url = '/test';
            fixture.detectChanges();

            routerSpy.navigateByUrl.withArgs('/test').and.returnValue(lastValueFrom(of(true)));
            directiveDebug.triggerEventHandler('click', new MouseEvent('click'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/test');

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledTimes(0);
            });
        });

        it("should throw error when angular url doesn't exist on click", () => {
            componentWrapper.url = '/not-exist';
            fixture.detectChanges();

            routerSpy.navigateByUrl.withArgs('/not-exist').and.returnValue(Promise.reject('Does not exist'));
            directiveHtml.click();
            expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/not-exist');
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledOnceWith('Does not exist');
            });
        });

        it('should navigate when url not http(s) by pressing enter', () => {
            componentWrapper.url = '/test';
            fixture.detectChanges();

            expect(directiveInstance.url).toEqual('/test');
            expect(directiveHtml.href).toBeUndefined();

            routerSpy.navigateByUrl.withArgs('/test').and.returnValue(lastValueFrom(of(true)));
            directiveDebug.triggerEventHandler('keydown.enter', new KeyboardEvent('enter'));
            expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/test');
            expect(windowOpenSpy).toHaveBeenCalledTimes(0);

            fixture.whenStable().then(() => {
                expect(spyOn(console, 'error')).toHaveBeenCalledTimes(0);
            });
        });
    });
});
