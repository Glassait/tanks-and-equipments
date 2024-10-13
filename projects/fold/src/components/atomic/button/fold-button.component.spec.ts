import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldButtonComponent } from './fold-button.component';
import { FoldIconComponent } from '../icon/fold-icon.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import type { FoldButtonShape, FoldButtonType } from './button.type';
import type { FoldIcon } from '../icon/icons-ts/icon.model';

@Component({
    template: ` <button fold-button [variant]="variant" [shape]="shape" [iconOnly]="iconOnly" [icon]="icon">
        Je suis un bouton testé
    </button>`,
    standalone: true,
    imports: [FoldButtonComponent],
})
class FoldButtonComponentWrapper {
    variant: FoldButtonType;
    shape: FoldButtonShape;
    iconOnly: boolean;
    icon: FoldIcon;
}

describe('FoldButtonComponent', () => {
    let componentWrapper: FoldButtonComponentWrapper;
    let componentInstance: FoldButtonComponent;
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

        componentInstance = fixture.debugElement.query(By.directive(FoldButtonComponent)).componentInstance;
        componentHtml = fixture.debugElement.query(By.directive(FoldButtonComponent)).nativeElement;
    });

    it('should create', () => {
        expect(componentInstance).toBeTruthy();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeDefined();
        expect(span.nativeElement.innerHTML.trim()).toEqual('Je suis un bouton testé');
        expect(svg).toBeNull();
    });

    it('should have default values for iconOnly and icon signals', () => {
        expect(componentInstance.iconOnly()).toBeFalsy();
        expect(componentInstance.icon()).toBeUndefined();
    });

    it('should return the correct class names based on foldType and shape', () => {
        componentWrapper.shape = 'rectangle';
        componentWrapper.variant = 'primary';
        fixture.detectChanges();

        let classNames = componentInstance.cssClasses;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--primary');
        expect(classNames).toContain('fold-button--rectangle');

        componentWrapper.shape = 'square';
        componentWrapper.variant = 'tertiary';
        fixture.detectChanges();

        classNames = componentInstance.cssClasses;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--tertiary');
        expect(classNames).toContain('fold-button--square');

        componentWrapper.shape = 'rectangle';
        componentWrapper.variant = 'tertiary';
        fixture.detectChanges();

        classNames = componentInstance.cssClasses;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--tertiary');
        expect(classNames).toContain('fold-button--rectangle');
    });

    it('should error when iconOnly=true but no icon is provided', () => {
        componentWrapper.iconOnly = true;
        fixture.detectChanges();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '<fold-button> The button is icon only but no icon given, please provide icon name (ex: <button foldButton icon="accountCircle"></button>)'
        );
    });

    it('should error when shape=rectangle and type=tertiary but no icon is provided', () => {
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

    it('should compute isIconOnly correctly when foldType=tertiary and shape=square with an icon', () => {
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

    it('should compute isIconOnly correctly when iconOnly=true and foldType!=tertiary', () => {
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

    it('should return false for isIconOnly when iconOnly=true but icon is missing', () => {
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

    it('should error when iconOnly=true but no aria-label given', () => {
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

    it('should not error when iconOnly=true and aria-label given', () => {
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
