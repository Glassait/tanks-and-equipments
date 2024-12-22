import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldTabsRadioComponent } from './fold-tabs-radio.component';
import { Component } from '@angular/core';
import { FoldIcon } from 'fold';
import { By } from '@angular/platform-browser';

@Component({
    template: `<fold-tabs-radio [label]="label" [value]="value" [icon]="icon" [radioGroupName]="radioGroupName" [checked]="checked" />`,
    standalone: true,
    imports: [FoldTabsRadioComponent],
})
class FoldTabsRadioWrapper {
    label: string;
    value: string;
    icon: FoldIcon | undefined;
    radioGroupName: string;
    checked: boolean;
}

describe('FoldTabsRadioComponent', () => {
    let wrapper: FoldTabsRadioWrapper;
    let fixture: ComponentFixture<FoldTabsRadioWrapper>;

    let component: FoldTabsRadioComponent;
    let componentHtml: HTMLElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({}).createComponent(FoldTabsRadioWrapper);

        wrapper = fixture.componentInstance;
        fixture.detectChanges();

        const debug = fixture.debugElement.query(By.directive(FoldTabsRadioComponent));
        component = debug.componentInstance;
        componentHtml = debug.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an input and a label', () => {
        expect(componentHtml.children.length).toBe(2);
        expect(componentHtml.children[0].localName).toBe('input');
        expect(componentHtml.children[1].localName).toBe('label');
    });

    it('should have an unique id', () => {
        const input: HTMLInputElement = componentHtml.children[0] as HTMLInputElement;
        const label: HTMLLabelElement = componentHtml.children[1] as HTMLLabelElement;

        expect(input.id).toMatch(/fold-tabs-button-\d/);
        expect(label.htmlFor).toMatch(/fold-tabs-button-\d/);
    });

    it('should have the right config when input given', () => {
        wrapper.radioGroupName = 'test-case';
        wrapper.value = 'value-1';
        wrapper.label = 'Tabs radio';
        fixture.detectChanges();

        expect(component.radioGroupName()).toBe('test-case');
        expect(component.value()).toBe('value-1');
        expect(component.label()).toBe('Tabs radio');

        const input: HTMLInputElement = componentHtml.children[0] as HTMLInputElement;
        const label: HTMLLabelElement = componentHtml.children[1] as HTMLLabelElement;

        expect(input.value).toBe('value-1');
        expect(input.name).toBe('test-case');
        expect(label.children.length).toBe(1);
        expect(label.textContent?.trim()).toBe('Tabs radio');
    });

    it('should have the right config when input given (with icon)', () => {
        wrapper.radioGroupName = 'test-case';
        wrapper.value = 'value-2';
        wrapper.label = 'Tabs radio';
        wrapper.icon = 'groups';
        fixture.detectChanges();

        expect(component.radioGroupName()).toBe('test-case');
        expect(component.value()).toBe('value-2');
        expect(component.label()).toBe('Tabs radio');
        expect(component.icon()).toBe('groups');

        const input: HTMLInputElement = componentHtml.children[0] as HTMLInputElement;
        const label: HTMLLabelElement = componentHtml.children[1] as HTMLLabelElement;

        expect(input.value).toBe('value-2');
        expect(input.name).toBe('test-case');
        expect(label.children.length).toBe(2);
        expect(label.textContent?.trim()).toBe('Tabs radio');
    });

    it('should be checked when input checked is true', () => {
        wrapper.checked = true;
        fixture.detectChanges();

        expect(component.checked()).toBe(true);

        const input: HTMLInputElement = componentHtml.children[0] as HTMLInputElement;
        const label: HTMLLabelElement = componentHtml.children[1] as HTMLLabelElement;

        expect(input.checked).toBeTrue();
        expect(label.attributes[8].value).toBe('true');
    });

    it('should change tabindex when checked', () => {
        let label: HTMLLabelElement = componentHtml.children[1] as HTMLLabelElement;
        expect(label.tabIndex).toBe(0);

        wrapper.checked = true;
        fixture.detectChanges();

        label = componentHtml.children[1] as HTMLLabelElement;
        expect(label.tabIndex).toBe(-1);

        wrapper.checked = false;
        fixture.detectChanges();

        label = componentHtml.children[1] as HTMLLabelElement;
        expect(label.tabIndex).toBe(0);
    });
});
