import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldFooterComponent } from './fold-footer.component';
import { Component } from '@angular/core';
import type { FoldNavigation } from '../header/header.type';
import { By } from '@angular/platform-browser';

@Component({
    template: ` <fold-footer [navigation]="navigation" />`,
    imports: [FoldFooterComponent],
    standalone: true,
})
class FoldFooterComponentWrapper {
    navigation: FoldNavigation[];
}

describe('FoldFooterComponent', () => {
    let wrapper: FoldFooterComponentWrapper;
    let fixture: ComponentFixture<FoldFooterComponentWrapper>;

    let component: FoldFooterComponent;
    let componentHtml: HTMLHeadElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldFooterComponentWrapper],
        }).createComponent(FoldFooterComponentWrapper);

        wrapper = fixture.componentInstance;
        fixture.detectChanges();

        const debugElement = fixture.debugElement.query(By.directive(FoldFooterComponent));
        componentHtml = debugElement.nativeElement;
        component = debugElement.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the right css classes', () => {
        expect(component.cssClasses).toBe('bg-neutral-900 flex items-center justify-center')
    });

    it('should have 1 link', () => {
        wrapper.navigation = [
            {
                text: 'text',
                url: '/test',
            },
        ];
        fixture.detectChanges();

        const ul = componentHtml.querySelector('ul')!;
        expect(ul.children.length).toEqual(1);
    });

    it('should have 2 links', () => {
        wrapper.navigation = [
            {
                text: 'text',
                url: '/test',
            },
            {
                text: 'text 2',
                url: '/test-2',
            },
        ];
        fixture.detectChanges();

        const ul = componentHtml.querySelector('ul')!;
        expect(ul.children.length).toEqual(2);
    });
});
