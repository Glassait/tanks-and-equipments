import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldButtonComponent } from './fold-button.component';
import { FoldIconComponent } from '../icon/fold-icon.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import type { FoldButtonShape, FoldButtonType } from './button.type';
import type { FoldIcon } from '../icon/icons-ts/icon.model';

@Component({
    template: `<button foldButton [foldType]="foldType" [shape]="shape" [iconOnly]="iconOnly" [icon]="icon">
        Je suis un bouton testé
    </button>`,
    standalone: true,
    imports: [FoldButtonComponent],
})
class FoldButtonComponentWrapper {
    foldType: FoldButtonType = 'primary';
    shape: FoldButtonShape = 'rectangle';
    iconOnly: boolean = false;
    icon: FoldIcon | undefined;
}

describe('FoldButtonComponent', () => {
    let componentWrapper: FoldButtonComponentWrapper;
    let component: FoldButtonComponent;
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
        let classNames = component.getClassName;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--primary');
        expect(classNames).toContain('fold-button--rectangle');

        componentWrapper.shape = 'square';
        componentWrapper.foldType = 'tertiary';
        fixture.detectChanges();

        classNames = component.getClassName;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--tertiary');
        expect(classNames).toContain('fold-button--square');

        componentWrapper.shape = 'rectangle';
        componentWrapper.foldType = 'tertiary';
        fixture.detectChanges();

        classNames = component.getClassName;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--tertiary');
        expect(classNames).toContain('fold-button--rectangle');
    });

    it('should return the correct class names based on foldType and shape', () => {
        const classNames = component.getClassName;
        expect(classNames).toContain('fold-button');
        expect(classNames).toContain('fold-button--primary');
        expect(classNames).toContain('fold-button--rectangle');
    });

    it('should warn when iconOnly is true but no icon is provided', () => {
        componentWrapper.iconOnly = true;
        fixture.detectChanges();

        expect(consoleErrorSpy).toHaveBeenCalledWith('<fold-button> The button is icon only but no icon given');
    });

    it('should warn when shape rectangle and type tertiary but no icon is provided', () => {
        componentWrapper.shape = 'square';
        componentWrapper.foldType = 'tertiary';
        fixture.detectChanges();

        expect(consoleErrorSpy).toHaveBeenCalledWith('<fold-button> The button is icon only but no icon given');
    });

    it('should not warn when iconOnly is false', () => {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should compute isIconOnly correctly when foldType is tertiary and shape is square with an icon', () => {
        componentWrapper.shape = 'square';
        componentWrapper.foldType = 'tertiary';
        componentWrapper.icon = 'forest';
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeNull();
        expect(svg).toBeDefined();
    });

    it('should compute isIconOnly correctly when iconOnly is true and foldType is not tertiary', () => {
        componentWrapper.iconOnly = true;
        componentWrapper.icon = 'forest';
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeNull();
        expect(svg).toBeDefined();
    });

    it('should return false for isIconOnly when iconOnly is true but icon is missing', () => {
        componentWrapper.iconOnly = true;
        fixture.detectChanges();

        const span = fixture.debugElement.query(By.css('span'));
        const svg = fixture.debugElement.query(By.css('svg'));

        expect(span).toBeDefined();
        expect(svg).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith('<fold-button> The button is icon only but no icon given');
    });
});
