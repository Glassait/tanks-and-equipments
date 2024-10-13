import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';
import type { FoldHeaderNavigation } from './header.type';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';
import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { FoldButtonComponent } from '../../atomic/button/fold-button.component';

@Component({
    selector: 'foldHeader',
    templateUrl: './fold-header.component.html',
    styleUrl: './fold-header.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldLinkDirective, UpperCasePipe, NgOptimizedImage, FoldButtonComponent],
})
export class FoldHeaderComponent {
    public navigation: InputSignal<FoldHeaderNavigation[]> = input.required();
}
