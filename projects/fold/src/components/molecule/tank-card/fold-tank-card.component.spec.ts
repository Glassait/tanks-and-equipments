import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldTankCardComponent } from './fold-tank-card.component';
import { Component, type DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';

@Component({
    template: `<fold-tank-card
        [role]="role"
        [priority]="priority"
        [level]="level"
        [isReward]="isReward"
        [type]="type"
        [nation]="nation"
        [name]="name"
        [wotName]="wotTankName"
    />`,
    standalone: true,
    imports: [FoldTankCardComponent],
})
class FoldTankCardComponentWrapper {
    role: string = 'heavyPush';
    priority: number = 5;
    level: number = 10;
    isReward: boolean = true;
    type: string = 'heavy';
    nation: string = 'ussr';
    name: string = 'object 260';
    wotTankName: string = 'r110_object_260';
}

describe('FoldTankCardComponent', () => {
    let fixture: ComponentFixture<FoldTankCardComponentWrapper>;
    let componentWrapper: FoldTankCardComponentWrapper;

    let componentInstance: FoldTankCardComponent;
    let componentDebug: DebugElement;

    let anchorDebug: DebugElement;
    let foldLinkDirectiveInstance: FoldLinkDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldTankCardComponentWrapper, FoldLinkDirective],
        }).createComponent(FoldTankCardComponentWrapper);

        componentWrapper = fixture.componentInstance;
        fixture.detectChanges();

        componentDebug = fixture.debugElement.query(By.directive(FoldTankCardComponent));
        componentInstance = componentDebug.componentInstance;

        anchorDebug = fixture.debugElement.query(By.directive(FoldLinkDirective));
        foldLinkDirectiveInstance = anchorDebug.injector.get(FoldLinkDirective);
    });

    it('should create', () => {
        expect(componentInstance).toBeTruthy();
    });

    it('should display have the right value', () => {
        expect(componentWrapper.role).toEqual('heavyPush');
        expect(componentWrapper.priority).toEqual(5);
        expect(componentWrapper.level).toEqual(10);
        expect(componentWrapper.isReward).toEqual(true);
        expect(componentWrapper.type).toEqual('heavy');
        expect(componentWrapper.nation).toEqual('ussr');
        expect(componentWrapper.name).toEqual('object 260');
        expect(componentWrapper.wotTankName).toEqual('r110_object_260');
    });

    it('should have a unique id', () => {
        const a = componentDebug.query(By.css('a')).nativeElement;
        expect(a.id).toMatch(/tank-card-\d/);
        expect(a.children.length).toEqual(2);
        expect(a.children[0].id).toMatch(/header-tank-card-\d/);
        expect(a.children[1].id).toMatch(/footer-tank-card-\d/);
    });

    it('should have with of 238px and heigth of 229px', () => {
        const a = componentDebug.query(By.css('a')).nativeElement;
        expect(a.offsetWidth).toEqual(238);
        expect(a.offsetHeight).toEqual(229);
    });

    it('should the anchor be correct', () => {
        const a = componentDebug.query(By.css('a')).nativeElement;
        expect(foldLinkDirectiveInstance.url()).toEqual('/chars-et-equipements/object_260');
        expect(foldLinkDirectiveInstance.openInNew()).toBeFalse();
        expect(foldLinkDirectiveInstance.target).toBeNull();
        expect(foldLinkDirectiveInstance.rel).toBeNull();
        expect(foldLinkDirectiveInstance.href).toBeNull();
        expect(a.text).toEqual('Object 260');
    });

    it('should display the right number of icon', () => {
        const a = componentDebug.query(By.css('a')).nativeElement;
        const footer = a.children[1];

        expect(footer.children.length).toEqual(9);

        componentWrapper.isReward = false;
        fixture.detectChanges();

        expect(footer.children.length).toEqual(7);
    });

    it('should have the right image', () => {
        const a = componentDebug.query(By.css('a')).nativeElement;
        const header = a.children[0].children[0];

        expect(header.children.length).toEqual(2);
        expect(header.children[0].attributes[11].value).toEqual('images/nation/flag-ussr.png');
        expect(header.children[0].alt).toEqual('Drapeau de ussr');
        expect(header.children[1].attributes[11].value).toEqual(
            'https://eu-wotp.wgcdn.co/dcont/tankopedia_images/r110_object_260/r110_object_260_image_resized.png'
        );
        expect(header.children[1].alt).toEqual('Image du char object 260');

        componentWrapper.nation = 'china';
        fixture.detectChanges();

        expect(header.children.length).toEqual(2);
        expect(header.children[0].attributes[11].value).toEqual('images/nation/flag-china.png');
        expect(header.children[0].alt).toEqual('Drapeau de china');

        componentWrapper.name = 'bz-75';
        componentWrapper.wotTankName = 'ch48_bz_75';
        fixture.detectChanges();
        expect(header.children[1].attributes[11].value).toEqual(
            'https://eu-wotp.wgcdn.co/dcont/tankopedia_images/ch48_bz_75/ch48_bz_75_image_resized.png'
        );
        expect(header.children[1].alt).toEqual('Image du char bz-75');
    });
});
