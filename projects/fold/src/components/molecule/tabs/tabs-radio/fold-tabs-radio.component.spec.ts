import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldTabsRadioComponent } from './fold-tabs-radio.component';

describe('FoldTabsButtonComponent', () => {
  let component: FoldTabsRadioComponent;
  let fixture: ComponentFixture<FoldTabsRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldTabsRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoldTabsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
