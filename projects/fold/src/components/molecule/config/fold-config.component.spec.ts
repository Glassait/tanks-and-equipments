import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldConfigComponent } from './fold-config.component';
import { Component, DebugElement } from '@angular/core';
import { TankConfigurationPriorityEnum } from '../../../generated-api/tanks';
import { By } from '@angular/platform-browser';
import { FoldTextComponent } from '../../atomic/text/fold-text.component';
import { FoldBadgeComponent } from '../../atomic/badge/fold-badge.component';

@Component({
    template: `<fold-config [title]="title" [priority]="priority" [showFooter]="showFooter">
        <p>Je suis le contenu</p>
        <span footer-config>Je suis un texte dans le footer</span>
    </fold-config>`,
    standalone: true,
    imports: [FoldConfigComponent],
})
class FoldConfigWrapper {
    title: string = '';
    priority: TankConfigurationPriorityEnum;
    showFooter: boolean;
}

describe('FoldConfigComponent', () => {
    let wrapper: FoldConfigWrapper;
    let fixture: ComponentFixture<FoldConfigWrapper>;

    let componentDebug: DebugElement;
    let component: FoldConfigComponent;
    let componentHtml: HTMLElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldConfigComponent, FoldTextComponent, FoldBadgeComponent],
        }).createComponent(FoldConfigWrapper);

        wrapper = fixture.componentInstance;
        fixture.detectChanges();

        componentDebug = fixture.debugElement.query(By.directive(FoldConfigComponent));
        component = componentDebug.componentInstance;
        componentHtml = componentDebug.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the right css classes', () => {
        expect(component.cssClasses).toBe('bg-neutral-700 flex direction-column gap-12')
        expect(componentHtml.className).toBe('bg-neutral-700 direction-column flex gap-12')
    });

    it('should have two divs with unique id when show footer is false', () => {
        wrapper.showFooter = false;
        fixture.detectChanges();

        expect(componentHtml.children.length).toBe(2);

        const header = componentHtml.children[0] as HTMLDivElement;

        expect(header.id).toMatch(/header-config-\d/);
        expect(header.localName).toBe('div');

        const content = componentHtml.children[1] as HTMLDivElement;

        expect(content.id).toMatch(/content-config-\d/);
        expect(content.localName).toBe('div');
        expect(content.children.length).toBe(1);
        expect(content.textContent?.trim()).toBe('Je suis le contenu');
    });

    it('should have three divs with unique id when show footer is true', () => {
        wrapper.showFooter = true;
        fixture.detectChanges();

        expect(componentHtml.children.length).toBe(3);

        const header = componentHtml.children[0] as HTMLDivElement;

        expect(header.id).toMatch(/header-config-\d/);
        expect(header.localName).toBe('div');

        const content = componentHtml.children[1] as HTMLDivElement;

        expect(content.id).toMatch(/content-config-\d/);
        expect(content.localName).toBe('div');
        expect(content.children.length).toBe(1);
        expect(content.textContent?.trim()).toBe('Je suis le contenu');

        const footer = componentHtml.children[2] as HTMLDivElement;

        expect(footer.id).toMatch(/footer-config-\d/);
        expect(footer.localName).toBe('div');
        expect(footer.children.length).toBe(1);
        expect(footer.textContent?.trim()).toBe('Je suis un texte dans le footer');
    });

    it('should have the right title', () => {
        wrapper.title = 'Je suis un titre';
        fixture.detectChanges();

        const foldTextDebug: DebugElement = componentDebug.children[0].query(By.directive(FoldTextComponent));

        expect(foldTextDebug.children.length).toBe(2);
        expect(foldTextDebug.nativeElement.textContent).toBe('Je suis un titre');
    });

    describe('priority', () => {
        it('should have the right icon and badge when priority is PRINCIPAL', () => {
            wrapper.priority = TankConfigurationPriorityEnum.Principal;
            fixture.detectChanges();

            const foldTextDebug: DebugElement = componentDebug.children[0].query(By.directive(FoldTextComponent));
            const foldBadgeDebug: DebugElement = componentDebug.children[0].query(By.directive(FoldBadgeComponent));

            const foldText: FoldTextComponent = foldTextDebug.componentInstance;
            expect(foldText.iconLeft()).toBe("priority5")

            const foldBadge: FoldBadgeComponent = foldBadgeDebug.componentInstance;
            expect(foldBadgeDebug.nativeElement.textContent).toBe('PRINCIPAL');
            expect(foldBadge.textColor()).toBe("neutral-100")
            expect(foldBadge.bgColor()).toBe("bg-primary-700")
        });

        it('should have the right icon and badge when priority is SECONDARY', () => {
            wrapper.priority = TankConfigurationPriorityEnum.Secondaire;
            fixture.detectChanges();

            const foldTextDebug: DebugElement = componentDebug.children[0].query(By.directive(FoldTextComponent));
            const foldBadgeDebug: DebugElement = componentDebug.children[0].query(By.directive(FoldBadgeComponent));

            const foldText: FoldTextComponent = foldTextDebug.componentInstance;
            expect(foldText.iconLeft()).toBe("priority3")

            const foldBadge: FoldBadgeComponent = foldBadgeDebug.componentInstance;
            expect(foldBadgeDebug.nativeElement.textContent).toBe('SECONDAIRE');
            expect(foldBadge.textColor()).toBe("neutral-100")
            expect(foldBadge.bgColor()).toBe("bg-success-500")
        });

        it('should have the right icon and badge when priority is ALTERNATIF', () => {
            wrapper.priority = TankConfigurationPriorityEnum.Alternatif;
            fixture.detectChanges();

            const foldTextDebug: DebugElement = componentDebug.children[0].query(By.directive(FoldTextComponent));
            const foldBadgeDebug: DebugElement = componentDebug.children[0].query(By.directive(FoldBadgeComponent));

            const foldText: FoldTextComponent = foldTextDebug.componentInstance;
            expect(foldText.iconLeft()).toBe("priority1")

            const foldBadge: FoldBadgeComponent = foldBadgeDebug.componentInstance;
            expect(foldBadgeDebug.nativeElement.textContent).toBe('ALTERNATIF');
            expect(foldBadge.textColor()).toBe("neutral-100")
            expect(foldBadge.bgColor()).toBe("bg-warning-500")
        });
    });
});
