import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanWarComponent } from './clan-war.component';

describe('ClanWarComponent', () => {
  let component: ClanWarComponent;
  let fixture: ComponentFixture<ClanWarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClanWarComponent]
    });
    fixture = TestBed.createComponent(ClanWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
