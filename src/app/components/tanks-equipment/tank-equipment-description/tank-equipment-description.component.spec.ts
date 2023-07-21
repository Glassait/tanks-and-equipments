import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankEquipmentDescriptionComponent } from './tank-equipment-description.component';

describe('TankEquipmentDescriptionComponent', () => {
  let component: TankEquipmentDescriptionComponent;
  let fixture: ComponentFixture<TankEquipmentDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TankEquipmentDescriptionComponent]
    });
    fixture = TestBed.createComponent(TankEquipmentDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
