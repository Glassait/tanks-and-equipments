import { ChangeDetectionStrategy, Component, HostBinding, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FoldFooterComponent, FoldHeaderComponent, type FoldNavigation } from 'fold';
import { AsyncPipe } from '@angular/common';
import { PathEnum } from 'core/enums/path.enum';
import { ResizeService } from 'shared/services/resize.service';

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, FoldHeaderComponent, FoldFooterComponent, AsyncPipe],
})
export class AppComponent {
    @HostBinding('class')
    get cssClasses(): string[] {
        return ['body-interface'];
    }

    //region INJECTION
    protected readonly resizeService: ResizeService = inject(ResizeService);
    private readonly router: Router = inject(Router);
    private readonly platformId = inject(PLATFORM_ID);
    //endregion

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
}
