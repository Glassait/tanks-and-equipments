import { ChangeDetectionStrategy, Component, HostBinding, input, InputSignal } from '@angular/core';
import { FoldTextComponent } from '../text/fold-text.component';
import { CssBgColorClasses, CssColorClasses } from '../../../models/types/css.type';

@Component({
    selector: 'span[fold-badge]',
    templateUrl: './fold-badge.component.html',
    styleUrl: './fold-badge.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldTextComponent],
})
export class FoldBadgeComponent {
    public bgColor: InputSignal<CssBgColorClasses> = input('bg-neutral-900' as CssBgColorClasses);
    public textColor: InputSignal<CssColorClasses> = input('warning-300' as CssColorClasses);

    @HostBinding('class')
    get cssClasses(): string {
        return `${this.bgColor()} ${this.textColor()} flex`;
    }
}
