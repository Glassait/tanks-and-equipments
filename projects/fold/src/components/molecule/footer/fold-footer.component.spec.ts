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
    let componentWrapper: FoldFooterComponentWrapper;
    let componentHtml: HTMLHeadElement;
    let fixture: ComponentFixture<FoldFooterComponentWrapper>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldFooterComponentWrapper],
        }).createComponent(FoldFooterComponentWrapper);

        componentWrapper = fixture.componentInstance;
        fixture.detectChanges();

        componentHtml = fixture.debugElement.query(By.directive(FoldFooterComponent)).nativeElement;
    });

    it('should create', () => {
        expect(componentWrapper).toBeTruthy();
    });

    it('should have 1 link', () => {
        componentWrapper.navigation = [
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
        componentWrapper.navigation = [
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