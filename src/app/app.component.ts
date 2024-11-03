import { ChangeDetectionStrategy, Component, HostBinding, inject, isDevMode, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FoldFooterComponent, FoldHeaderComponent, type FoldNavigation } from 'fold';
import { AsyncPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { PathEnum } from 'core/enums/path.enum';
import { ResizeService } from 'shared/services/resize.service';

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, FoldHeaderComponent, FoldFooterComponent, NgClass, AsyncPipe],
})
export class AppComponent {
    @HostBinding('class')
    get cssClasses(): string[] {
        if (isPlatformBrowser(this.plateformId)) {
            return ['body-interface', this.router.url === '/' && this.resizeService.isDesktop.getValue() ? '' : 'gap-40'];
        }
        return ['body-interface'];
    }

    //region INJECTION
    protected readonly resizeService: ResizeService = inject(ResizeService);
    private readonly router: Router = inject(Router);
    private readonly plateformId = inject(PLATFORM_ID);
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
