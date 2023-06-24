import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankSmallComponent } from './tank-small.component';

describe('TankSmallComponent', () => {
  let component: TankSmallComponent;
  let fixture: ComponentFixture<TankSmallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TankSmallComponent]
    });
    fixture = TestBed.createComponent(TankSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
