import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldButtonComponent } from './fold-button.component';
import { FoldIconComponent } from '../icon/fold-icon.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import type { FoldButtonShape, FoldButtonType } from './button.type';
import type { FoldIcon } from '../icon/icons-ts/icon.model';

@Component({
    template: ` <button foldButton [variant]="variant" [shape]="shape" [iconOnly]="iconOnly" [icon]="icon">
        Je suis un bouton testé
    </button>`,
    standalone: true,
    imports: [FoldButtonComponent],
})
class FoldButtonComponentWrapper {
    variant: FoldButtonType = 'primary';
    shape: FoldButtonShape = 'rectangle';
    iconOnly: boolean = false;
    icon: FoldIcon | undefined;
}

describe('FoldButtonComponent', () => {
    let componentWrapper: FoldButtonComponentWrapper;
    let component: FoldButtonComponent;
    let componentHtml: HTMLButtonElement;
    let fixture: ComponentFixture<FoldButtonComponentWrapper>;
    let consoleErrorSpy: jasmine.Spy;

    beforeEach(() => {
        consoleErrorSpy = spyOn(console, 'error');

        fixture = TestBed.configureTestingModule({
            imports: [FoldButtonComponentWrapper, FoldIconComponent],
        }).createComponent(FoldButtonComponentWrapper);

        componentWrapper = fixture.componentInstance;
        fixture.detectChanges();

        component = fixture.debugElement.query(By.directive(FoldButtonComponent)).componentInstance;
        componentHtml = fixture.debugElement.query(By.directive(FoldButtonComponent)).nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeDefined();
        expect(span.nativeElement.innerHTML.trim()).toEqual('Je suis un bouton testé');
        expect(svg).toBeNull();
    });

    it('should have default values for iconOnly and icon signals', () => {
        expect(component.iconOnly()).toBeFalse();
        expect(component.icon()).toBeUndefined();
    });

    it('should return the correct class names based on foldType and shape', () => {
        let classNames = component.cssClasses;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--primary');
        expect(classNames).toContain('fold-button--rectangle');

        componentWrapper.shape = 'square';
        componentWrapper.variant = 'tertiary';
        fixture.detectChanges();

        classNames = component.cssClasses;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--tertiary');
        expect(classNames).toContain('fold-button--square');

        componentWrapper.shape = 'rectangle';
        componentWrapper.variant = 'tertiary';
        fixture.detectChanges();

        classNames = component.cssClasses;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--tertiary');
        expect(classNames).toContain('fold-button--rectangle');
    });

    it('should warn when iconOnly is true but no icon is provided', () => {
        componentWrapper.iconOnly = true;
        fixture.detectChanges();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '<fold-button> The button is icon only but no icon given, please provide icon name (ex: <button foldButton icon="accountCircle"></button>)'
        );
    });

    it('should warn when shape rectangle and type tertiary but no icon is provided', () => {
        componentWrapper.shape = 'square';
        componentWrapper.variant = 'tertiary';
        fixture.detectChanges();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '<fold-button> The button is icon only but no icon given, please provide icon name (ex: <button foldButton icon="accountCircle"></button>)'
        );
    });

    it('should not warn when iconOnly is false', () => {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should compute isIconOnly correctly when foldType is tertiary and shape is square with an icon', () => {
        componentWrapper.shape = 'square';
        componentWrapper.variant = 'tertiary';
        componentWrapper.icon = 'forest';
        componentHtml.ariaLabel = 'Je suis un aria-label';
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeNull();
        expect(svg).toBeDefined();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
    });

    it('should compute isIconOnly correctly when iconOnly is true and foldType is not tertiary', () => {
        componentWrapper.iconOnly = true;
        componentWrapper.icon = 'fieldModification';
        componentHtml.ariaLabel = 'Je suis un aria-label';
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeNull();
        expect(svg).toBeDefined();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
    });

    it('should return false for isIconOnly when iconOnly is true but icon is missing', () => {
        componentWrapper.iconOnly = true;
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeDefined();
        expect(svg).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '<fold-button> The button is icon only but no icon given, please provide icon name (ex: <button foldButton icon="accountCircle"></button>)'
        );
    });

    it('should warn when icon only but not aria-label given', () => {
        componentWrapper.iconOnly = true;
        componentWrapper.icon = 'accountCircle';
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeNull();
        expect(svg).toBeDefined();
        expect(fixture.debugElement.query(By.directive(FoldButtonComponent)).nativeElement.ariaLabel).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '<fold-button> The button is icon only, please provide ariaLabel (ex:  <button foldButton aria-label="Fermer">...</button>)'
        );
    });

    it('should no warn when icon only and aria-label given', () => {
        componentWrapper.iconOnly = true;
        componentWrapper.icon = 'accountCircle';
        componentHtml.ariaLabel = 'Je suis un aria-label';
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeNull();
        expect(svg).toBeDefined();
        expect(componentHtml.ariaLabel).toEqual('Je suis un aria-label');
        expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
    });
});
