import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';
import type { FoldNavigation } from '../header/header.type';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';

@Component({
    selector: 'fold-footer',
    standalone: true,
    templateUrl: './fold-footer.component.html',
    styleUrl: './fold-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage, FoldLinkDirective, TitleCasePipe],
})
export class FoldFooterComponent {
    public navigation: InputSignal<FoldNavigation[]> = input.required();
}
