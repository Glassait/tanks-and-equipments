import { ChangeDetectionStrategy, Component, computed, inject, type Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FoldFooterComponent, FoldHeaderComponent, type FoldNavigation } from 'fold';
import { NgClass } from '@angular/common';
import { PathEnum } from 'core/enums/path.enum';

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, FoldHeaderComponent, FoldFooterComponent, NgClass],
})
export class AppComponent {
    private readonly router: Router = inject(Router);

    protected cssClasses: Signal<string> = computed((): string => (this.router.url === '/' ? '' : 'gap-40'));

    protected readonly headerNavigation: FoldNavigation[] = [
        {
            text: 'accueil',
            url: '/',
        },
        {
            text: 'chars & équipements',
            url: `/${PathEnum.CHARS_EQUIPMENT}`,
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
            url: `/${PathEnum.CHARS_EQUIPMENT}`,
        },
    ];
}
