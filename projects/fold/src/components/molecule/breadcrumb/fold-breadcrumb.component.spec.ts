import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldBreadcrumbComponent } from './fold-breadcrumb.component';
import { Component, type DebugElement } from '@angular/core';
import type { BreadcrumbModel } from './breadcrumb.model';
import { By } from '@angular/platform-browser';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';

@Component({
    template: '<fold-breadcrumb [links]="links"/>',
    imports: [FoldBreadcrumbComponent],
    standalone: true,
})
export class FoldBreadcrumbComponentWrapper {
    links: BreadcrumbModel[];
}

describe('FoldBreadcrumbComponent', () => {
    let component: FoldBreadcrumbComponentWrapper;
    let fixture: ComponentFixture<FoldBreadcrumbComponentWrapper>;

    let breadcrumbComponent: FoldBreadcrumbComponentWrapper;
    let breadcrumbDebug: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldBreadcrumbComponentWrapper, FoldLinkDirective],
        }).createComponent(FoldBreadcrumbComponentWrapper);

        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbDebug = fixture.debugElement.query(By.directive(FoldBreadcrumbComponent));
        breadcrumbComponent = breadcrumbDebug.componentInstance;
    });

    it('should create', () => {
        expect(breadcrumbComponent).toBeTruthy();
    });

    it('should have 1 disabled link when 1 link given', () => {
        component.links = [
            {
                name: 'link1',
                url: '/link1',
            },
        ];
        fixture.detectChanges();

        const as = breadcrumbDebug.queryAll(By.directive(FoldLinkDirective));
        expect(as.length).toEqual(1);

        const link = as[0].injector.get(FoldLinkDirective);
        expect(link.url()).toEqual('/link1');
        expect(link.attrDisabled).toBeTrue();
        expect(link.ariaHidden).toBeTrue();
    });

    it('should have the first link active and second disabled link when 2 links given', () => {
        component.links = [
            {
                name: 'link1',
                url: '/link1',
            },
            {
                name: 'link2',
                url: '/link2',
            },
        ];
        fixture.detectChanges();

        const as = breadcrumbDebug.queryAll(By.directive(FoldLinkDirective));
        expect(as.length).toEqual(2);

        const link1 = as[0].injector.get(FoldLinkDirective);
        expect(link1.url()).toEqual('/link1');
        expect(link1.attrDisabled).toBeNull();
        expect(link1.ariaHidden).toBeNull();

        const link2 = as[1].injector.get(FoldLinkDirective);
        expect(link2.url()).toEqual('/link2');
        expect(link2.attrDisabled).toBeTrue();
        expect(link2.ariaHidden).toBeTrue();
    });
});
