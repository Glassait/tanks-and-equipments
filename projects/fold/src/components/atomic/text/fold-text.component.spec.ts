import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldTextComponent } from './fold-text.component';
import { Component } from '@angular/core';
import type { FoldTextSize } from './text.type';
import { By } from '@angular/platform-browser';
import type { FoldIcon } from '../icon/icons-ts/icon.model';
import type { FoldIconSize } from '../icon/icon.type';
import { FoldIconComponent } from '../icon/fold-icon.component';

@Component({
    template: ` <button fold-text [size]="size" [iconLeft]="iconLeft" [iconRight]="iconRight" [overrideIconSize]="overrideIconSize">
        Je suis un bouton
    </button>`,
    standalone: true,
    imports: [FoldTextComponent],
})
class FoldTextComponentWrapper {
    size: FoldTextSize;
    iconLeft: FoldIcon | undefined;
    iconRight: FoldIcon | undefined;
    overrideIconSize: FoldIconSize | undefined;
}

describe('FoldTextComponent', () => {
    let componentWrapper: FoldTextComponentWrapper;

    let componentInstance: FoldTextComponent;
    let componentHtml: HTMLButtonElement;
    let fixture: ComponentFixture<FoldTextComponentWrapper>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldTextComponentWrapper],
        }).createComponent(FoldTextComponentWrapper);

        componentWrapper = fixture.componentInstance;
        fixture.detectChanges();

        let debugElement = fixture.debugElement.query(By.directive(FoldTextComponent));
        componentInstance = debugElement.componentInstance;
        componentHtml = debugElement.nativeElement;
    });

    it('should create', () => {
        expect(componentInstance).toBeTruthy();
    });

    it('should have the right css class in relation to the size', () => {
        const defaultClasses = 'flex align-center justify-center';
        componentWrapper.size = 'small';
        fixture.detectChanges();

        let cssClasses = componentInstance.cssClasses;
        expect(cssClasses.join(' ')).toEqual(`caption-2 gap-4 ${defaultClasses}`);

        componentWrapper.size = 'medium';
        fixture.detectChanges();

        cssClasses = componentInstance.cssClasses;
        expect(cssClasses.join(' ')).toEqual(`caption-1 gap-8 ${defaultClasses}`);

        componentWrapper.size = 'large';
        fixture.detectChanges();

        cssClasses = componentInstance.cssClasses;
        expect(cssClasses.join(' ')).toEqual(`body-2 gap-8 ${defaultClasses}`);

        componentWrapper.size = 'x-large';
        fixture.detectChanges();

        cssClasses = componentInstance.cssClasses;
        expect(cssClasses.join(' ')).toEqual(`body-1 gap-8 ${defaultClasses}`);

        componentWrapper.size = 'subtitle';
        fixture.detectChanges();

        cssClasses = componentInstance.cssClasses;
        expect(cssClasses.join(' ')).toEqual(`subtitle-1 gap-12 ${defaultClasses}`);

        componentWrapper.size = 'title-3';
        fixture.detectChanges();

        cssClasses = componentInstance.cssClasses;
        expect(cssClasses.join(' ')).toEqual(`title-3 gap-12 ${defaultClasses}`);
    });

    it('should have svg before span when iconLeft', () => {
        componentWrapper.iconLeft = 'chevronLeft';
        fixture.detectChanges();

        const span = componentHtml.querySelector('span')!;
        expect(span.previousElementSibling?.localName).toBe('fold-icon');
        expect(span.nextElementSibling?.localName).toBeUndefined();
    });

    it('should have svg after span when iconRight', () => {
        componentWrapper.iconRight = 'chevronLeft';
        fixture.detectChanges();

        const span = componentHtml.querySelector('span')!;
        expect(span.nextElementSibling?.localName).toBe('fold-icon');
        expect(span.previousElementSibling?.localName).toBeUndefined();
    });

    it('should have svg before and after span when iconRight and iconLeft', () => {
        componentWrapper.iconRight = 'chevronLeft';
        componentWrapper.iconLeft = 'chevronLeft';
        fixture.detectChanges();

        const span = componentHtml.querySelector('span')!;
        expect(span.nextElementSibling?.localName).toBe('fold-icon');
        expect(span.previousElementSibling?.localName).toBe('fold-icon');
    });

    it('should override icon size when overrideIconSize is given', () => {
        componentWrapper.size = 'small';
        componentWrapper.iconRight = 'chevronLeft';
        componentWrapper.overrideIconSize = 72;
        fixture.detectChanges();

        const foldIcon = fixture.debugElement.query(By.directive(FoldIconComponent)).componentInstance;
        const size = foldIcon.size();
        expect(size).toEqual(72);
    });
});
