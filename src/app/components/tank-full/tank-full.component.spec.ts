import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankFullComponent } from './tank-full.component';

describe('TankFullComponent', () => {
  let component: TankFullComponent;
  let fixture: ComponentFixture<TankFullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TankFullComponent]
    });
    fixture = TestBed.createComponent(TankFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
