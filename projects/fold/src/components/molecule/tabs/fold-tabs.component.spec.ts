import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldTabsComponent } from './fold-tabs.component';
import { Component, DebugElement } from '@angular/core';
import { FoldTabsInput } from './tabs.model';
import { By } from '@angular/platform-browser';

@Component({
    template: ` <fold-tabs
        [radioGroupName]="radioGroupName"
        [radios]="radios"
        [autoSelectFirst]="autoSelectFirst"
        (selectionEvent)="selected = $event"
    >
        @if (selected === '1') {
            First one
        } @else if (selected === '2') {
            Second one
        }
    </fold-tabs>`,
    standalone: true,
    imports: [FoldTabsComponent],
})
class FoldTabsWrapper {
    radioGroupName: string;
    radios: FoldTabsInput[] = [
        {
            label: 'Radio 1',
            value: '1',
        },
        {
            label: 'Radio 2',
            value: '2',
        },
    ];
    autoSelectFirst: boolean = false;
    selected: string;
}

@Component({
    template: ` <fold-tabs
        [radioGroupName]="radioGroupName"
        [radios]="radios"
        [autoSelectFirst]="autoSelectFirst"
        (selectionEvent)="selected = $event"
    >
        @if (selected === '1') {
            First one
        } @else if (selected === '2') {
            Second one
        }
    </fold-tabs>`,
    standalone: true,
    imports: [FoldTabsComponent],
})
class FoldTabsWrapperWithAutoSelectFirst {
    radioGroupName: string;
    radios: FoldTabsInput[] = [
        {
            label: 'Radio 1',
            value: '1',
        },
        {
            label: 'Radio 2',
            value: '2',
        },
    ];
    autoSelectFirst: boolean = true;
    selected: string;
}

describe('FoldTabsComponent', () => {
    let wrapper: FoldTabsWrapper;
    let fixture: ComponentFixture<FoldTabsWrapper>;

    let componentDebug: DebugElement;
    let component: FoldTabsComponent;
    let componentHtml: HTMLElement;

    describe('Without autoSelectedFirst', () => {
        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                imports: [FoldTabsWrapper]
            }).createComponent(FoldTabsWrapper);

            wrapper = fixture.componentInstance;
            fixture.detectChanges();

            componentDebug = fixture.debugElement.query(By.directive(FoldTabsComponent));
            component = componentDebug.componentInstance;
            componentHtml = componentDebug.nativeElement;
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('host should have the right css class', () => {
            expect(component.scssClass).toBe('flex direction-column gap-8');
        });

        it('should have a fieldset and a div', () => {
            expect(componentHtml.children.length).toBe(2);
            expect(componentHtml.children[0].localName).toBe('fieldset');
            expect(componentHtml.children[1].localName).toBe('div');
        });

        it('should have 2 fold-tabs-radio', () => {
            const fieldset = componentDebug.query(By.css('fieldset'));

            expect(fieldset.children.length).toBe(2);
            expect(fieldset.children[0].nativeElement.localName).toBe('fold-tabs-radio');
            expect(fieldset.children[1].nativeElement.localName).toBe('fold-tabs-radio');
        });

        it('should change the number of fold-tabs-radio when radios change', () => {
            wrapper.radios = [
                {
                    label: 'Radio 3',
                    value: '3',
                },
            ];
            fixture.detectChanges();

            const fieldset = componentDebug.query(By.css('fieldset'));

            expect(fieldset.children.length).toBe(1);
            expect(fieldset.children[0].nativeElement.localName).toBe('fold-tabs-radio');
        });

        it('should send the radio selected on click', () => {
            component.selectionEvent.subscribe(value => expect(value).toBe('1'));

            const radio = componentDebug.query(By.css('fieldset fold-tabs-radio'));
            radio.children[0].nativeElement.click();
            expect(radio.children[0].nativeElement.checked).toBeTrue();
        });

        it('should send the radio selected keydown space', () => {
            component.selectionEvent.subscribe(value => expect(value).toBe('1'));

            const radio = componentDebug.query(By.css('fieldset fold-tabs-radio'));
            radio.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'space' }));
            fixture.detectChanges()
            expect(radio.children[0].nativeElement.checked).toBeTrue();
        });

        it('should send the radio selected keydown enter', () => {
            component.selectionEvent.subscribe(value => expect(value).toBe('1'));

            const radio = componentDebug.query(By.css('fieldset fold-tabs-radio'));
            radio.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));
            fixture.detectChanges()
            expect(radio.children[0].nativeElement.checked).toBeTrue();
        });

        it('should change the tabs content when click on radio', () => {
            expect(componentHtml.children[1].textContent?.trim()).toBe('');

            const radio = componentDebug.query(By.css('fieldset fold-tabs-radio'));
            radio.children[0].nativeElement.click();
            fixture.detectChanges();

            expect(componentHtml.children[1].textContent?.trim()).toBe('First one');
        });

        it('should have the first radio not checked when auto selected first is false', () => {
            const fieldset = componentDebug.query(By.css('fieldset'));
            expect(fieldset.children[0].children[0].nativeElement.checked).toBeFalse();
            expect(fieldset.children[1].children[0].nativeElement.checked).toBeFalse();
        });
    });

    describe('With autoSelectedFirst', () => {
        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                imports: [FoldTabsWrapper]
            }).createComponent(FoldTabsWrapperWithAutoSelectFirst);

            wrapper = fixture.componentInstance;
            fixture.detectChanges();

            componentDebug = fixture.debugElement.query(By.directive(FoldTabsComponent));
            component = componentDebug.componentInstance;
            componentHtml = componentDebug.nativeElement;
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('host should have the right css class', () => {
            expect(component.scssClass).toBe('flex direction-column gap-8');
        });

        it('should have a fieldset and a div', () => {
            expect(componentHtml.children.length).toBe(2);
            expect(componentHtml.children[0].localName).toBe('fieldset');
            expect(componentHtml.children[1].localName).toBe('div');
        });

        it('should have 2 fold-tabs-radio', () => {
            const fieldset = componentDebug.query(By.css('fieldset'));

            expect(fieldset.children.length).toBe(2);
            expect(fieldset.children[0].nativeElement.localName).toBe('fold-tabs-radio');
            expect(fieldset.children[1].nativeElement.localName).toBe('fold-tabs-radio');
        });

        it('should change the number of fold-tabs-radio when radios change', () => {
            wrapper.radios = [
                {
                    label: 'Radio 3',
                    value: '3',
                },
            ];
            fixture.detectChanges();

            const fieldset = componentDebug.query(By.css('fieldset'));

            expect(fieldset.children.length).toBe(1);
            expect(fieldset.children[0].nativeElement.localName).toBe('fold-tabs-radio');
        });

        it('should send the radio selected on click', () => {
            component.selectionEvent.subscribe(value => expect(value).toBe('1'));

            const radio = componentDebug.query(By.css('fieldset fold-tabs-radio'));
            radio.children[0].nativeElement.click();
            expect(radio.children[0].nativeElement.checked).toBeTrue();
        });

        it('should send the radio selected keydown space', () => {
            component.selectionEvent.subscribe(value => expect(value).toBe('1'));

            const radio = componentDebug.query(By.css('fieldset fold-tabs-radio'));
            radio.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'space' }));
            fixture.detectChanges()
            expect(radio.children[0].nativeElement.checked).toBeTrue();
        });

        it('should send the radio selected keydown enter', () => {
            component.selectionEvent.subscribe(value => expect(value).toBe('1'));

            const radio = componentDebug.query(By.css('fieldset fold-tabs-radio'));
            radio.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));
            fixture.detectChanges()
            expect(radio.children[0].nativeElement.checked).toBeTrue();
        });

        it('should change the tabs content when click on radio', () => {
            expect(componentHtml.children[1].textContent?.trim()).toBe('First one');

            const fieldset = componentDebug.query(By.css('fieldset'));
            fieldset.children[1].children[0].nativeElement.click();
            fixture.detectChanges();

            expect(componentHtml.children[1].textContent?.trim()).toBe('Second one');
        });

        it('should have the first radio checked when auto selected first is true', () => {
            const fieldset = componentDebug.query(By.css('fieldset'));
            expect(fieldset.children[0].children[0].nativeElement.checked).toBeTrue();
            expect(fieldset.children[1].children[0].nativeElement.checked).toBeFalse();
        });
    });
});
