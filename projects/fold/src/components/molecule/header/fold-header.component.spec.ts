import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldHeaderComponent } from './fold-header.component';
import { Component } from '@angular/core';
import type { FoldNavigation } from './header.type';
import { By } from '@angular/platform-browser';

@Component({
    template: `<fold-header [navigation]="navigation" />`,
    imports: [FoldHeaderComponent],
    standalone: true,
})
class FoldHeaderComponentWrapper {
    navigation: FoldNavigation[];
}

describe('HeaderComponent', () => {
    let wrapper: FoldHeaderComponentWrapper;
    let fixture: ComponentFixture<FoldHeaderComponentWrapper>;

    let component: FoldHeaderComponent;
    let componentHtml: HTMLHeadElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldHeaderComponentWrapper],
        }).createComponent(FoldHeaderComponentWrapper);

        wrapper = fixture.componentInstance;
        fixture.detectChanges();

        const debugElement = fixture.debugElement.query(By.directive(FoldHeaderComponent));
        component = debugElement.componentInstance;
        componentHtml = debugElement.nativeElement;
    });

    it('should create', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should have the right css classes', () => {
        expect(component.cssClasses).toBe('flex items-center justify-center bg-neutral-900')
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
