import { Component } from '@angular/core';
import { FoldIconComponent } from './fold-icon.component';
import { default as Icons, type FoldIcon } from './icons-ts/icon.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { FoldSize } from './icon.type';

@Component({
    template: `<fold-icon [icon]="icon" [size]="size"></fold-icon>`,
    standalone: true,
    imports: [FoldIconComponent],
})
class FoldIconComponentWrapper {
    icon: FoldIcon = 'chevronLeft';
    size: FoldSize = 16;
}

function createSvg(icon: FoldIcon, size?: number): SVGSVGElement {
    let dom = document.createElement('div');
    dom.innerHTML = Icons[icon];
    let expectedSvg = dom.querySelector('svg')!;
    expectedSvg.style.display = 'block';

    if (size) {
        expectedSvg.setAttribute('width', String(size));
        expectedSvg.setAttribute('height', String(size));
    }

    return expectedSvg;
}

describe('FoldIconComponent', () => {
    let componentWrapper: FoldIconComponentWrapper;
    let component: FoldIconComponent;
    let fixture: ComponentFixture<FoldIconComponentWrapper>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldIconComponentWrapper],
        }).createComponent(FoldIconComponentWrapper);

        componentWrapper = fixture.componentInstance;
        fixture.detectChanges();

        component = fixture.debugElement.query(By.directive(FoldIconComponent)).componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        const svg = fixture.nativeElement.querySelector('svg');
        expect(svg).toBeDefined();
        expect(svg.outerHTML).toEqual(createSvg('chevronLeft').outerHTML);
    });

    it('should change icon when input change', () => {
        let svg = fixture.nativeElement.querySelector('svg');
        expect(svg).toBeDefined();
        expect(svg.outerHTML).toEqual(createSvg('chevronLeft').outerHTML);

        componentWrapper.icon = 'accountCircle';
        fixture.detectChanges();

        svg = fixture.nativeElement.querySelector('svg');
        expect(svg).toBeDefined();
        expect(svg.outerHTML).toEqual(createSvg('accountCircle').outerHTML);
    });

    it('should have the right size', () => {
        let svg = fixture.nativeElement.querySelector('svg');
        expect(svg).toBeDefined();
        expect(svg.outerHTML).toEqual(createSvg('chevronLeft').outerHTML);
        expect(svg.clientHeight).toEqual(16);
        expect(svg.clientWidth).toEqual(16);
    });

    it('should change the size whan input change', () => {
        componentWrapper.size = 20;
        fixture.detectChanges();

        let svg = fixture.nativeElement.querySelector('svg');
        expect(svg).toBeDefined();
        expect(svg.outerHTML).toEqual(createSvg('chevronLeft', 20).outerHTML);
        expect(svg.clientHeight).toEqual(20);
        expect(svg.clientWidth).toEqual(20);
    });
});
