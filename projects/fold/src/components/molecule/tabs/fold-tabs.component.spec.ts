import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldTabsComponent } from './fold-tabs.component';

describe('FoldTabsComponent', () => {
  let component: FoldTabsComponent;
  let fixture: ComponentFixture<FoldTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoldTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
