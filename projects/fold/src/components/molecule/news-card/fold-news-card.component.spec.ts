import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldNewsCardComponent } from './fold-news-card.component';
import { Component, type DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';

@Component({
    template: '<fold-news-card [title]="title" [tags]="tags" [imageUrl]="imageUrl" [url]="url"/>',
    standalone: true,
    imports: [FoldNewsCardComponent],
})
class FoldNewsCardComponentWrapper {
    title: string = "améliorez votre aura avec le merchandising d'Halloween de World of Tanks";
    tags: string[] = ['autres nouveautés'];
    imageUrl: string = 'https://eu-wotp.wgcdn.co/dcont/fb/image/halloween_bizdev_we_are_nation_2024_1920x900_banner.jpg';
    url: string = 'https://worldoftanks.eu/fr/news/merchandise/we-are-nation-halloween-2024/';
}

describe('FoldNewsCardComponent', () => {
    let component: FoldNewsCardComponentWrapper;
    let fixture: ComponentFixture<FoldNewsCardComponentWrapper>;

    let componentInstance: FoldNewsCardComponent;
    let componentDebug: DebugElement;

    let anchorDebug: DebugElement;
    let foldLink: FoldLinkDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FoldNewsCardComponentWrapper, FoldLinkDirective],
        }).createComponent(FoldNewsCardComponentWrapper);

        component = fixture.componentInstance;
        fixture.detectChanges();

        componentDebug = fixture.debugElement.query(By.directive(FoldNewsCardComponent));
        componentInstance = componentDebug.componentInstance;

        anchorDebug = fixture.debugElement.query(By.directive(FoldLinkDirective));
        foldLink = anchorDebug.injector.get(FoldLinkDirective);
    });

    it('should create', () => {
        expect(componentInstance).toBeTruthy();
    });

    it('should have unique id', () => {
        const a = componentDebug.query(By.css('a')).nativeElement;
        expect(a.id).toMatch(/news-\d/);
    });

    it('the link should have has text the spans', () => {
        const a = componentDebug.query(By.css('a')).nativeElement;
        expect(a.text).toEqual("Améliorez votre aura avec le merchandising d'Halloween de World of Tanks.Voir l'article");
    });

    it('should have the right input', () => {
        expect(componentInstance.title()).toEqual("améliorez votre aura avec le merchandising d'Halloween de World of Tanks");
        expect(componentInstance.url()).toEqual('https://worldoftanks.eu/fr/news/merchandise/we-are-nation-halloween-2024/');
        expect(componentInstance.imageUrl()).toEqual(
            'https://eu-wotp.wgcdn.co/dcont/fb/image/halloween_bizdev_we_are_nation_2024_1920x900_banner.jpg'
        );
        expect(componentInstance.tags().length).toEqual(1);
        expect(componentInstance.tags()[0]).toEqual('autres nouveautés');
    });

    it('should have the right image url', () => {
        const img = componentDebug.query(By.css('img')).nativeElement;
        expect(img.src).toEqual('https://eu-wotp.wgcdn.co/dcont/fb/image/halloween_bizdev_we_are_nation_2024_1920x900_banner.jpg');
    });

    it('the link should be correctly formated', () => {
        expect(foldLink.url()).toEqual('https://worldoftanks.eu/fr/news/merchandise/we-are-nation-halloween-2024/');
        expect(foldLink.target).toEqual('_blank');
        expect(foldLink.openInNew()).toBeTrue();
        expect(foldLink.rel).toEqual('noreferrer');
        expect(foldLink.focusable).toEqual(0);
    });
});
