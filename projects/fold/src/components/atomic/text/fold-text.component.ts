import { ChangeDetectionStrategy, Component, computed, HostBinding, input, type InputSignal, type Signal } from '@angular/core';
import type { FoldTextSize } from './text.type';
import type { FoldIcon } from '../icon/icons-ts/icon.model';
import { FoldIconComponent } from '../icon/fold-icon.component';
import type { FoldIconSize } from '../icon/icon.type';

@Component({
    selector:
        'button[fold-text], a[fold-text], span[fold-text], div[fold-text], p[fold-text], h1[fold-text], h2[fold-text], h3[fold-text], h4[fold-text]',
    templateUrl: './fold-text.component.html',
    styleUrl: './fold-text.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldIconComponent],
})
export class FoldTextComponent {
    public size: InputSignal<FoldTextSize> = input.required();
    public iconLeft: InputSignal<FoldIcon | undefined> = input();
    public iconRight: InputSignal<FoldIcon | undefined> = input();
    public overrideIconSize: InputSignal<FoldIconSize | undefined> = input();

    @HostBinding('class')
    get cssClasses(): string[] {
        return [this.mapSizeCssClasses[this.size()], 'flex', 'align-center', 'justify-center'];
    }

    protected computedIconSize: Signal<FoldIconSize> = computed(
        (): FoldIconSize => (this.overrideIconSize() ? this.overrideIconSize()! : this.mapSizeIconSize[this.size()])
    );

    private readonly mapSizeIconSize: { [k in FoldTextSize]: FoldIconSize } = {
        small: 12,
        medium: 16,
        large: 20,
        'x-large': 24,
        subtitle: 16,
        'title-3': 24,
    };

    private readonly mapSizeCssClasses: { [k in FoldTextSize]: string } = {
        small: 'caption-2 gap-4',
        medium: 'caption-1 gap-8',
        large: 'body-2 gap-8',
        'x-large': 'body-1 gap-8',
        subtitle: 'subtitle-1 gap-12',
        'title-3': 'title-3 gap-12',
    };
}
