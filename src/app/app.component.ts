import { ChangeDetectionStrategy, Component, computed, inject, type Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FoldFooterComponent, FoldHeaderComponent, type FoldNavigation } from 'fold';
import { AsyncPipe, NgClass } from '@angular/common';
import { PathEnum } from 'core/enums/path.enum';
import { ResizeService } from 'shared/services/resize.service';

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styles: ['h1, p { text-align: center }'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, FoldHeaderComponent, FoldFooterComponent, NgClass, AsyncPipe],
})
export class AppComponent {
    private readonly router: Router = inject(Router);
    protected readonly resizeService: ResizeService = inject(ResizeService);

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

    protected readonly footerNavigation: FoldNavigation[] = [
        {
            text: 'accueil',
            url: '/',
        },
        {
            text: 'chars & équipements',
            url: `/${PathEnum.CHARS_EQUIPMENT}`,
        },
    ];
    protected cssClasses: Signal<string> = computed((): string =>
        this.router.url === '/' && this.resizeService.isDesktop.getValue() ? '' : 'gap-40'
    );
}
