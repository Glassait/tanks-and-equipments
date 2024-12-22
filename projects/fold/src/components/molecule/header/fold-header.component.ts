import { ChangeDetectionStrategy, Component, HostBinding, input, type InputSignal } from '@angular/core';
import { FoldLinkDirective } from '../../../directives/link/fold-link.directive';
import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { FoldButtonComponent } from '../../atomic/button/fold-button.component';
import type { FoldNavigation } from './header.type';

@Component({
    selector: 'fold-header',
    templateUrl: './fold-header.component.html',
    styleUrl: './fold-header.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldLinkDirective, UpperCasePipe, NgOptimizedImage, FoldButtonComponent],
})
export class FoldHeaderComponent {
    public navigation: InputSignal<FoldNavigation[]> = input.required();

    @HostBinding('class')
    get cssClasses() {
        return 'flex items-center justify-center bg-neutral-900';
    }
}
