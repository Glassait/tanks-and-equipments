import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldBadgeComponent } from './fold-badge.component';
import { Component } from '@angular/core';
import { CssBgColorClasses, CssColorClasses } from 'fold';
import { By } from '@angular/platform-browser';

@Component({
    template: `<span fold-badge [textColor]="textColor" [bgColor]="bgColor">This is a badge</span>`,
    standalone: true,
    imports: [FoldBadgeComponent],
})
class FoldBadgeWrapper {
    textColor: CssColorClasses = "warning-300";
    bgColor: CssBgColorClasses = "bg-neutral-900";
}

describe('FoldBadgeComponent', () => {
    let wrapper: FoldBadgeWrapper;
    let fixture: ComponentFixture<FoldBadgeWrapper>;

    let component: FoldBadgeComponent;
    let componentHtml: HTMLSpanElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldBadgeComponent],
        }).createComponent(FoldBadgeWrapper);

        wrapper = fixture.componentInstance;
        fixture.detectChanges();

        const debugElement = fixture.debugElement.query(By.directive(FoldBadgeComponent));
        component = debugElement.componentInstance;
        componentHtml = debugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a p', () => {
        expect(componentHtml.children.length).toBe(1);
        expect(componentHtml.children[0].localName).toBe('p');
    });

    it('should have the same text', () => {
        expect(componentHtml.textContent).toBe('This is a badge');
    });

    it('should have the default css class', () => {
        expect(component.bgColor()).toBe('bg-neutral-900');
        expect(component.textColor()).toBe('warning-300');
        expect(component.cssClasses).toBe('bg-neutral-900 warning-300 flex');
        expect(componentHtml.className).toBe('bg-neutral-900 flex warning-300');
    });

    it('should change the class when input change', () => {
        wrapper.textColor = "neutral-50"
        wrapper.bgColor = "bg-warning-900"
        fixture.detectChanges();

        expect(component.bgColor()).toBe('bg-warning-900');
        expect(component.textColor()).toBe('neutral-50');
        expect(component.cssClasses).toBe('bg-warning-900 neutral-50 flex');
        expect(componentHtml.className).toBe('flex bg-warning-900 neutral-50');
    });
});
