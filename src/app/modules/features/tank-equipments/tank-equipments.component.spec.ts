import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankEquipmentsComponent } from './tank-equipments.component';

describe('TankEquipmentesComponent', () => {
    let component: TankEquipmentsComponent;
    let fixture: ComponentFixture<TankEquipmentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TankEquipmentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TankEquipmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
