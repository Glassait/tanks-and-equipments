import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldHeaderComponent } from './fold-header.component';
import { Component } from '@angular/core';
import type { FoldHeaderNavigation } from './header.type';
import { By } from '@angular/platform-browser';

@Component({
    template: ` <foldHeader [navigation]="navigation" />`,
    imports: [FoldHeaderComponent],
    standalone: true,
})
class FoldHeaderComponentWrapper {
    navigation: FoldHeaderNavigation[];
}

describe('HeaderComponent', () => {
    let componentWrapper: FoldHeaderComponentWrapper;
    let componentHtml: HTMLHeadElement;
    let fixture: ComponentFixture<FoldHeaderComponentWrapper>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldHeaderComponentWrapper],
        }).createComponent(FoldHeaderComponentWrapper);

        componentWrapper = fixture.componentInstance;
        fixture.detectChanges();

        componentHtml = fixture.debugElement.query(By.directive(FoldHeaderComponent)).nativeElement;
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
