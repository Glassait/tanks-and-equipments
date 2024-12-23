import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldConfigComponent } from './fold-config.component';

describe('FoldConfigComponent', () => {
  let component: FoldConfigComponent;
  let fixture: ComponentFixture<FoldConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoldConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
