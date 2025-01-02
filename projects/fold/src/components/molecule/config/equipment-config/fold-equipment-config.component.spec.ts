import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldEquipmentConfigComponent } from './fold-equipment-config.component';
import { Component, type DebugElement } from '@angular/core';
import { FoldConfigComponent } from '../fold-config.component';
import {
    type Consumable,
    ConsumableWotNameEnum,
    type Directive,
    DirectiveWotNameEnum,
    type Equipment,
    EquipmentWotNameEnum,
    TankConfigurationPriorityEnum,
} from '../../../../generated-api/tanks';
import { By } from '@angular/platform-browser';

@Component({
    template: `<fold-config [title]="'This is a title'" [priority]="TankConfigurationPriorityEnum.Principal"
        ><fold-equipment-config [equipments]="equipments" [directive]="directive" [consumables]="consumables" [showDeluxe]="showDeluxe" />
    </fold-config>`,
    standalone: true,
    imports: [FoldConfigComponent, FoldEquipmentConfigComponent],
})
class FoldEquipmentConfigComponentWrapper {
    protected readonly TankConfigurationPriorityEnum = TankConfigurationPriorityEnum;
    equipments: Equipment[] = [
        {
            name: "Gamme d'amélioration de la survie",
            wotName: EquipmentWotNameEnum.ModernizedExtraHealthReserveAntifragmentationLining,
            isModernized: true,
        },
        {
            name: 'Fouloir de canon',
            wotName: EquipmentWotNameEnum.Rammer,
            isModernized: false,
        },
        {
            name: "Système d'amélioration de la mobilité",
            wotName: EquipmentWotNameEnum.ModernizedTurbochargerRotationMechanism,
            isModernized: true,
        },
    ];
    directive: Directive = {
        name: 'Râtelier de munitions en ordre',
        wotName: DirectiveWotNameEnum.RammerBattleBooster,
    };
    consumables: Consumable[] = [
        {
            name: 'Grande trousse de premiers secours',
            wotName: ConsumableWotNameEnum.LargeMedkit,
        },
        {
            name: 'Grand kit de réparation',
            wotName: ConsumableWotNameEnum.LargeRepairkit,
        },
        {
            name: 'Rations de combat supplémentaires',
            wotName: ConsumableWotNameEnum.Ration,
        },
    ];
    showDeluxe: boolean;
}

describe('FoldEquipmentConfigComponent', () => {
    let wrapper: FoldEquipmentConfigComponentWrapper;
    let fixture: ComponentFixture<FoldEquipmentConfigComponentWrapper>;

    let componentDebug: DebugElement;
    let component: FoldEquipmentConfigComponent;
    let componentHtml: HTMLElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldEquipmentConfigComponentWrapper],
        }).createComponent(FoldEquipmentConfigComponentWrapper);

        wrapper = fixture.componentInstance;
        fixture.detectChanges();

        componentDebug = fixture.debugElement.query(By.directive(FoldEquipmentConfigComponent));
        component = componentDebug.componentInstance;
        componentHtml = componentDebug.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the right css class to the host', () => {
        expect(component.cssClasses).toBe('flex gap-32');
        expect(componentHtml.className).toBe('flex gap-32');
    });

    it('should have show deluxe to false by default', () => {
        expect(component.showDeluxe()).toBeFalsy();

        const equipments = componentDebug.query(By.css('fold-equipment-config div:nth-child(1) div'));
        expect(equipments.children[1].children.length).toBe(1);
    });

    it('should show deluxe when setting to true', () => {
        wrapper.showDeluxe = true;
        fixture.detectChanges();

        expect(component.showDeluxe()).toBeTrue();

        const equipments = componentDebug.query(By.css('fold-equipment-config div:nth-child(1) div'));
        expect(equipments.children[1].children.length).toBe(2);
        expect(equipments.children[1].children[1].componentInstance.icon()).toBe('deluxe');
    });

    it('should show modernize icon when equipment is modernize', () => {
        wrapper.equipments = [
            {
                name: "Gamme d'amélioration de la survie",
                wotName: EquipmentWotNameEnum.ModernizedExtraHealthReserveAntifragmentationLining,
                isModernized: true,
            },
        ];
        fixture.detectChanges();

        const equipments = componentDebug.query(By.css('fold-equipment-config div:nth-child(1) div'));
        expect(equipments.children[0].children.length).toBe(2);
        expect(equipments.children[0].children[1].componentInstance.icon()).toBe('modernize');
    });

    it('should have unique id', () => {
        expect(componentHtml.children[0].id).toMatch(/equipments-config-\d/);
        expect(componentHtml.children[1].id).toMatch(/directive-config-\d/);
        expect(componentHtml.children[2].id).toMatch(/consumables-config-\d/);
    });

    it('should display three equipments, one directive and three consumables', () => {
        expect(component.equipments().length).toBe(3);
        expect(component.directive()).toBeTruthy();
        expect(component.consumables().length).toBe(3);

        expect(componentHtml.children.length).toBe(3);

        const equipments = componentDebug.query(By.css('fold-equipment-config div:nth-child(1) div'));
        expect(equipments.children.length).toBe(3);

        const directive = componentDebug.query(By.css('fold-equipment-config div:nth-child(2) div'));
        expect(directive.children.length).toBe(1);

        expect(directive.children[0].componentInstance.icon()).toBe(wrapper.directive.wotName);
        expect(directive.children[0].nativeElement.title).toBe(wrapper.directive.name);

        const consumables = componentDebug.query(By.css('fold-equipment-config div:nth-child(3) div'));
        expect(consumables.children.length).toBe(3);

        for (let i = 0; i < 3; i++) {
            expect(equipments.children[i].children[0].componentInstance.icon()).toBe(wrapper.equipments[i].wotName);
            expect(equipments.children[i].children[0].nativeElement.title).toBe(wrapper.equipments[i].name);
            expect(consumables.children[i].componentInstance.icon()).toBe(wrapper.consumables[i].wotName);
            expect(consumables.children[i].nativeElement.title).toBe(wrapper.consumables[i].name);
        }
    });

    it('should display 1 equipments, one directive and 1 consumables when entry change', () => {
        wrapper.equipments = [
            {
                name: "Gamme d'amélioration de la survie",
                wotName: EquipmentWotNameEnum.ModernizedExtraHealthReserveAntifragmentationLining,
                isModernized: true,
            },
        ];
        wrapper.directive = {
            name: 'Râtelier de munitions en ordre',
            wotName: DirectiveWotNameEnum.RammerBattleBooster,
        };
        wrapper.consumables = [
            {
                name: 'Grande trousse de premiers secours',
                wotName: ConsumableWotNameEnum.LargeMedkit,
            },
        ];
        fixture.detectChanges();

        expect(component.equipments().length).toBe(1);
        expect(component.directive()).toBeTruthy();
        expect(component.consumables().length).toBe(1);

        expect(componentHtml.children.length).toBe(3);

        const equipments = componentDebug.query(By.css('fold-equipment-config div:nth-child(1) div'));
        expect(equipments.children.length).toBe(1);

        expect(equipments.children[0].children[0].componentInstance.icon()).toBe(wrapper.equipments[0].wotName);
        expect(equipments.children[0].children[0].nativeElement.title).toBe(wrapper.equipments[0].name);

        const directive = componentDebug.query(By.css('fold-equipment-config div:nth-child(2) div'));
        expect(directive.children.length).toBe(1);

        expect(directive.children[0].componentInstance.icon()).toBe(wrapper.directive.wotName);
        expect(directive.children[0].nativeElement.title).toBe(wrapper.directive.name);

        const consumables = componentDebug.query(By.css('fold-equipment-config div:nth-child(3) div'));
        expect(consumables.children.length).toBe(1);

        expect(consumables.children[0].componentInstance.icon()).toBe(wrapper.consumables[0].wotName);
        expect(consumables.children[0].nativeElement.title).toBe(wrapper.consumables[0].name);
    });
});
