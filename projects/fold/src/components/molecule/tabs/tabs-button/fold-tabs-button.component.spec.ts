import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldTabsButtonComponent } from './fold-tabs-button.component';

describe('FoldTabsButtonComponent', () => {
  let component: FoldTabsButtonComponent;
  let fixture: ComponentFixture<FoldTabsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldTabsButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoldTabsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
