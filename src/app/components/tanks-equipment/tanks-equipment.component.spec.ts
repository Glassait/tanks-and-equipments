import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanksEquipmentComponent } from './tanks-equipment.component';

describe('TanksEquipmentComponent', () => {
  let component: TanksEquipmentComponent;
  let fixture: ComponentFixture<TanksEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TanksEquipmentComponent]
    });
    fixture = TestBed.createComponent(TanksEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
