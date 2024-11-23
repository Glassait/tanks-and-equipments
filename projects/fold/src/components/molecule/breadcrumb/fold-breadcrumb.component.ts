import { ChangeDetectionStrategy, Component, HostBinding, input, type InputSignal } from '@angular/core';
import type { BreadcrumbModel } from './breadcrumb.model';
import { FoldIconComponent } from '../../atomic/icon/fold-icon.component';
import { TitleCasePipe } from '@angular/common';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';

@Component({
    selector: 'fold-breadcrumb',
    templateUrl: './fold-breadcrumb.component.html',
    styleUrl: './fold-breadcrumb.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldIconComponent, FoldLinkDirective, TitleCasePipe],
})
export class FoldBreadcrumbComponent {
    @HostBinding('class')
    get cssClasses(): string[] {
        return ['flex', 'align-center'];
    }

    public links: InputSignal<BreadcrumbModel[]> = input.required();
}
