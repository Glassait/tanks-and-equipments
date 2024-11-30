// eslint-disable-next-line max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldSelectComponent } from './fold-select.component';
import { Component, type DebugElement } from '@angular/core';
import type { SelectItem } from './select.model';
import { By } from '@angular/platform-browser';
import { FoldTextComponent } from '../../atomic/text/fold-text.component';
import { FoldIconComponent } from '../../atomic/icon/fold-icon.component';

@Component({
    template: '<fold-select [selectTitle]="title" [selectItems]="items"/>',
    standalone: true,
    imports: [FoldSelectComponent],
})
class FoldSelectComponentWrapperWithDefault {
    title: string = 'Title';
    items: SelectItem[] = [
        {
            text: 'Item 1',
            value: '1',
            selectedByDefault: true,
        },
        {
            text: 'Item 2',
            value: '2',
            icon: 'filterCzech',
        },
        {
            text: 'Item 3',
            value: '3',
            icon: 'filterChina',
        },
    ];
}

@Component({
    template: '<fold-select [selectTitle]="title" [selectItems]="items"/>',
    standalone: true,
    imports: [FoldSelectComponent],
})
class FoldSelectComponentWrapper {
    title: string = 'Title';
    items: SelectItem[] = [
        {
            text: 'Item 1',
            value: '1',
            icon: 'filterUsa',
        },
        {
            text: 'Item 2',
            value: '2',
            icon: 'filterCzech',
        },
    ];
}

describe('FoldSelectComponent', () => {
    describe('With Default', () => {
        let component: FoldSelectComponentWrapperWithDefault;
        let fixture: ComponentFixture<FoldSelectComponentWrapperWithDefault>;

        let selectComponent: FoldSelectComponent;
        let selectDebug: DebugElement;

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                imports: [FoldSelectComponentWrapperWithDefault, FoldTextComponent, FoldIconComponent],
            }).createComponent(FoldSelectComponentWrapperWithDefault);

            component = fixture.componentInstance;
            fixture.detectChanges();

            selectDebug = fixture.debugElement.query(By.directive(FoldSelectComponent));
            selectComponent = selectDebug.componentInstance;
        });

        it('should create', () => {
            expect(selectComponent).toBeTruthy();
        });

        it('should have the unique id', () => {
            const button = selectDebug.query(By.css('button')).nativeElement;
            expect(button.id).toMatch(/fold-select-\d/);

            const div = selectDebug.query(By.css('div')).nativeElement;
            expect(div.id).toMatch(/filter-popover-\d/);
        });

        it('should have 3 elements', () => {
            const ul = fixture.debugElement.query(By.css('ul')).nativeElement;
            expect(ul.children.length).toEqual(3);
            expect(selectComponent.selectItems().length).toEqual(3);
        });

        it('should display the element of the list', () => {
            component.items = [
                {
                    text: 'Item 4',
                    value: '4',
                    icon: 'check',
                },
            ];
            fixture.detectChanges();

            const ul = fixture.debugElement.query(By.css('ul')).nativeElement;
            expect(ul.children.length).toEqual(1);
            expect(selectComponent.selectItems().length).toEqual(1);
        });

        it('should have selected item by default when items have selectedByDefault', () => {
            let debug = selectDebug.query(By.css('button.select'));
            const p = debug.query(By.css('p')).nativeElement;
            debug = debug.query(By.directive(FoldIconComponent));
            const foldIcon = debug.injector.get(FoldIconComponent);
            expect(p.innerText).toEqual('Title');
            expect(foldIcon.icon()).toEqual('chevronBottom');

            const button = fixture.debugElement.query(By.css('ul li button'));
            expect(button.classes['selected']).toBeDefined();
        });

        it('should selected the right item when clicked', () => {
            selectComponent.selectedItem.subscribe(value => {
                expect(value).toEqual('2');
            });

            let list = fixture.debugElement.query(By.css('ul')).nativeElement;
            let item2 = list.children[1].children[0];
            item2.click();
            fixture.detectChanges();

            expect(item2.classList.contains('selected')).toBeTrue();
        });

        it('should title change when item selected', () => {
            let list = fixture.debugElement.query(By.css('ul')).nativeElement;
            let item2 = list.children[1].children[0];
            item2.click();
            fixture.detectChanges();

            let debug = selectDebug.query(By.css('button.select'));
            const p = debug.query(By.css('p')).nativeElement;
            debug = debug.query(By.directive(FoldIconComponent));
            const foldIcon = debug.injector.get(FoldIconComponent);
            expect(p.innerText).toEqual('Title :');
            expect(foldIcon.icon()).toEqual('filterCzech');
        });
    });

    describe('Without Default', () => {
        let component: FoldSelectComponentWrapper;
        let fixture: ComponentFixture<FoldSelectComponentWrapper>;

        let selectComponent: FoldSelectComponent;
        let selectDebug: DebugElement;

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                imports: [FoldSelectComponentWrapper, FoldTextComponent, FoldIconComponent],
            }).createComponent(FoldSelectComponentWrapper);

            component = fixture.componentInstance;
            fixture.detectChanges();

            selectDebug = fixture.debugElement.query(By.directive(FoldSelectComponent));
            selectComponent = selectDebug.componentInstance;
        });

        it('should create', () => {
            expect(selectComponent).toBeTruthy();
        });

        it('should have the unique id', () => {
            const button = selectDebug.query(By.css('button')).nativeElement;
            expect(button.id).toMatch(/fold-select-\d/);

            const div = selectDebug.query(By.css('div')).nativeElement;
            expect(div.id).toMatch(/filter-popover-\d/);
        });

        it('should have 2 elements', () => {
            const ul = fixture.debugElement.query(By.css('ul')).nativeElement;
            expect(ul.children.length).toEqual(2);
            expect(selectComponent.selectItems().length).toEqual(2);
        });

        it('should display the element of the list', () => {
            component.items = [
                {
                    text: 'Item 4',
                    value: '4',
                    icon: 'check',
                },
            ];
            fixture.detectChanges();

            const ul = fixture.debugElement.query(By.css('ul')).nativeElement;
            expect(ul.children.length).toEqual(1);
            expect(selectComponent.selectItems().length).toEqual(1);
        });

        it('should have no selected item by default when no items have selectedByDefault', () => {
            let debug = selectDebug.query(By.css('button.select'));
            const p = debug.query(By.css('p')).nativeElement;
            debug = debug.query(By.directive(FoldIconComponent));
            const foldIcon = debug.injector.get(FoldIconComponent);
            expect(p.innerText).toEqual('Title');
            expect(foldIcon.icon()).toEqual('chevronBottom');

            const button = fixture.debugElement.query(By.css('ul li button'));
            expect(button.classes['selected']).toBeUndefined();
        });

        it('should selected the right item when clicked', () => {
            selectComponent.selectedItem.subscribe(value => {
                expect(value).toEqual('2');
            });

            let list = fixture.debugElement.query(By.css('ul')).nativeElement;
            let item2 = list.children[1].children[0];
            item2.click();
            fixture.detectChanges();

            expect(item2.classList.contains('selected')).toBeTrue();
        });

        it('should title change when item selected', () => {
            let list = fixture.debugElement.query(By.css('ul')).nativeElement;
            let item2 = list.children[1].children[0];
            item2.click();
            fixture.detectChanges();

            let debug = selectDebug.query(By.css('button.select'));
            const p = debug.query(By.css('p')).nativeElement;
            debug = debug.query(By.directive(FoldIconComponent));
            const foldIcon = debug.injector.get(FoldIconComponent);
            expect(p.innerText).toEqual('Title :');
            expect(foldIcon.icon()).toEqual('filterCzech');
        });
    });
});
