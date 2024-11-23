import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldSelectComponent } from './fold-select.component';

describe('FoldFilterComponent', () => {
    let component: FoldSelectComponent;
    let fixture: ComponentFixture<FoldSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FoldSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FoldSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
