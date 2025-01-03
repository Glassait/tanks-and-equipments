import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldCrewConfigComponent } from './fold-crew-config.component';
import { Component, type DebugElement } from '@angular/core';
import { type CrewMember, SkillWotNameEnum, TankOverviewNationEnum } from '../../../../generated-api/tanks';
import { By } from '@angular/platform-browser';

@Component({
    template: '<fold-crew-config [nation]="nation" [crew]="crew"/>',
    standalone: true,
    imports: [FoldCrewConfigComponent],
})
class FoldCrewConfigComponentWrapper {
    nation: TankOverviewNationEnum;
    crew: CrewMember = {
        name: 'commander',
        skills: [
            {
                level: 1,
                name: "Frères d'armes",
                wotName: SkillWotNameEnum.Brotherhood,
            },
            {
                level: 2,
                name: 'Réparations',
                wotName: SkillWotNameEnum.Repair,
            },
            {
                level: 3,
                name: 'Urgence',
                wotName: SkillWotNameEnum.CommanderEmergency,
            },
            {
                level: 4,
                name: 'Œil de lynx',
                wotName: SkillWotNameEnum.CommanderEagleEye,
            },
            {
                level: 5,
                name: 'Praticité',
                wotName: SkillWotNameEnum.CommanderPractical,
            },
            {
                level: 6,
                name: 'Mentor',
                wotName: SkillWotNameEnum.CommanderTutor,
            },
        ],
        secondary_roles: [
            {
                name: 'radioman',
                skills: [
                    {
                        level: 1,
                        name: 'Pompier',
                        wotName: SkillWotNameEnum.FireFighting,
                    },
                    {
                        level: 2,
                        name: 'Côte à côte',
                        wotName: SkillWotNameEnum.RadiomanSideBySide,
                    },
                    {
                        level: 3,
                        name: 'Longue-vue',
                        wotName: SkillWotNameEnum.RadiomanFinder,
                    },
                ],
                secondary_roles: [],
            },
        ],
    };
}

function getWotId({ src }: HTMLImageElement) {
    return Number(/\d/.exec(/\d.png/.exec(src)![0])![0]);
}

describe('FoldCrewConfigComponent', () => {
    let wrapper: FoldCrewConfigComponentWrapper;
    let fixture: ComponentFixture<FoldCrewConfigComponentWrapper>;

    let componentDebug: DebugElement;
    let component: FoldCrewConfigComponent;
    let componentHtml: HTMLElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldCrewConfigComponentWrapper],
        }).createComponent(FoldCrewConfigComponentWrapper);

        wrapper = fixture.componentInstance;
        fixture.detectChanges();

        componentDebug = fixture.debugElement.query(By.directive(FoldCrewConfigComponent));
        component = componentDebug.componentInstance;
        componentHtml = componentDebug.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the right css class to host', () => {
        expect(component.cssClasses).toBe('flex direction-column justify-center gap-8');
        expect(componentHtml.className).toBe('direction-column flex gap-8 justify-center');
    });

    it('should have unique id', () => {
        expect(componentHtml.children.length).toBe(2);
        expect(componentHtml.children[0].id).toMatch(/header-crew-config-\d/);
        expect(componentHtml.children[1].id).toMatch(/skills-crew-config-\d/);
    });

    it('should have the right wot id based on the name', () => {
        const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
        let wotId = getWotId(img);
        expect(wotId).toBe(1);

        wrapper.crew = { name: 'gunner', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        wotId = getWotId(img);
        expect(wotId).toBe(2);

        wrapper.crew = { name: 'driver', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        wotId = getWotId(img);
        expect(wotId).toBe(3);

        wrapper.crew = { name: 'radioman', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        wotId = getWotId(img);
        expect(wotId).toBe(4);

        wrapper.crew = { name: 'loader', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        wotId = getWotId(img);
        expect(wotId).toBe(5);
    });

    it('should have the right name translated', () => {
        const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
        const span: HTMLSpanElement = fixture.debugElement.query(By.css('div > span')).nativeElement;
        expect(img.title).toBe('Commandant');
        expect(span.textContent).toBe('Commandant');

        wrapper.crew = { name: 'gunner', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        expect(img.title).toBe('Tirreur');
        expect(span.textContent).toBe('Tirreur');

        wrapper.crew = { name: 'driver', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        expect(img.title).toBe('Pilote');
        expect(span.textContent).toBe('Pilote');

        wrapper.crew = { name: 'radioman', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        expect(img.title).toBe('Opérateur Radio');
        expect(span.textContent).toBe('Opérateur Radio');

        wrapper.crew = { name: 'loader', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        expect(img.title).toBe('Chargeur');
        expect(span.textContent).toBe('Chargeur');
    });

    it('should be correctly organised', () => {
        expect(componentHtml.children.length).toBe(2);

        const header: HTMLDivElement = componentHtml.children[0] as HTMLDivElement;
        expect(header.children.length).toBe(2);
        expect(header.children[0].localName).toBe('img');
        expect(header.children[1].localName).toBe('span');

        const body: HTMLDivElement = componentHtml.children[1] as HTMLDivElement;
        expect(body.children.length).toBe(2);

        const role1: HTMLDivElement = body.children[0] as HTMLDivElement;
        expect(role1.children.length).toBe(7);
        expect(role1.children[0].localName).toBe('fold-icon');

        const role2: HTMLDivElement = body.children[1] as HTMLDivElement;
        expect(role2.children.length).toBe(4);
        expect(role2.children[0].localName).toBe('fold-icon');
    });

    it('should have the right img url in function of nation and crew name', () => {
        wrapper.nation = TankOverviewNationEnum.Ussr;
        fixture.detectChanges();

        const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
        expect(img.src).toBe(
            'https://eu-wotp.wgcdn.co/static/6.2.8_cfaf5d/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/ussr-face-1.png'
        );

        wrapper.nation = TankOverviewNationEnum.France;
        wrapper.crew = { name: 'loader', skills: [], secondary_roles: [] };
        fixture.detectChanges();

        expect(img.src).toBe(
            'https://eu-wotp.wgcdn.co/static/6.2.8_cfaf5d/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/france-face-5.png'
        );
    });
});
