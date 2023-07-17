import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let conteneurHeader: HTMLElement;
    let leftHeader: Element;
    let centerHeader: Element;
    let rightHeader: Element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [RouterModule.forRoot(routes)],
        });
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        conteneurHeader = fixture.nativeElement.children[0];
        leftHeader = conteneurHeader.children[0];
        centerHeader = conteneurHeader.children[1];
        rightHeader = conteneurHeader.children[2];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
        expect(component.showHome).toBeFalse();
        expect(component.showTank).toBeFalse();
        expect(component.showWar).toBeFalse();
    });

    it('Check id of div', () => {
        expect(conteneurHeader.id).toEqual('conteneurHeader');
        expect(leftHeader.id).toEqual('leftHeader');
        expect(centerHeader.id).toEqual('centerHeader');
        expect(rightHeader.id).toEqual('rightHeader');
    });

    it('Show home link', () => {
        component.showHome = true;
        fixture.detectChanges();

        leftHeader = fixture.nativeElement.children[0].children[0];

        expect(leftHeader.textContent?.trim()).toEqual("PAGE D'ACCUEIL");
    });

    it('Show tank link', () => {
        component.showTank = true;
        fixture.detectChanges();

        rightHeader = fixture.nativeElement.children[0].children[2];

        expect(rightHeader.textContent?.trim()).toEqual('CHARS & ÉQUIPEMENTS');
    });

    it('Show war link', () => {
        component.showWar = true;
        fixture.detectChanges();

        rightHeader = fixture.nativeElement.children[0].children[2];

        expect(rightHeader.textContent?.trim()).toEqual('CLAN WAR');
    });

    it('Show tank & war links', () => {
        component.showTank = true;
        component.showWar = true;
        fixture.detectChanges();

        rightHeader = fixture.nativeElement.children[0].children[2];

        expect(rightHeader.textContent?.trim()).toEqual(
            'CHARS & ÉQUIPEMENTS  CLAN WAR'
        );
    });

    it('Show all links', () => {
        component.showHome = true;
        component.showTank = true;
        component.showWar = true;
        fixture.detectChanges();

        leftHeader = fixture.nativeElement.children[0].children[0];
        rightHeader = fixture.nativeElement.children[0].children[2];

        expect(leftHeader.textContent?.trim()).toEqual("PAGE D'ACCUEIL");
        expect(rightHeader.textContent?.trim()).toEqual(
            'CHARS & ÉQUIPEMENTS  CLAN WAR'
        );
    });
});
