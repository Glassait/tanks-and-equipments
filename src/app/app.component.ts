import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoldFooterComponent, FoldHeaderComponent, type FoldNavigation } from 'fold';

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, FoldHeaderComponent, FoldFooterComponent],
})
export class AppComponent {
    protected readonly headerNavigation: FoldNavigation[] = [
        {
            text: 'accueil',
            url: '/',
        },
        {
            text: 'chars & équipements',
            url: '/chars-et-equipement',
        },
        {
            text: 'wot officiel',
            url: 'https://worldoftanks.eu/fr/',
            openInNew: true,
        },
    ];
    footerNavigation: FoldNavigation[] = [
        {
            text: 'accueil',
            url: '/',
        },
        {
            text: 'chars & équipements',
            url: '/chars-et-equipement',
        },
    ];
}
