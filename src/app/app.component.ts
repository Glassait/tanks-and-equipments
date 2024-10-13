import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoldHeaderComponent, type FoldHeaderNavigation } from '@fold';

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, FoldHeaderComponent],
})
export class AppComponent {
    protected readonly navigation: FoldHeaderNavigation[] = [
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
}
