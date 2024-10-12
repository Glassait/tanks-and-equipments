import {
    ChangeDetectionStrategy,
    Component,
    computed,
    HostBinding,
    input,
    type InputSignal,
    type Signal,
    ViewEncapsulation,
} from '@angular/core';
import { FoldIconComponent } from '../icon/fold-icon.component';
import type { FoldButtonShape, FoldButtonType } from './button.type';
import type { FoldIcon } from '../icon/icons-ts/icon.model';

@Component({
    selector: 'button[foldButton], a[foldButton]',
    templateUrl: './fold-button.component.html',
    styleUrl: './fold-button.component.scss',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FoldIconComponent],
})
export class FoldButtonComponent {
    public foldType: InputSignal<FoldButtonType> = input.required();

    public shape: InputSignal<FoldButtonShape> = input.required();

    public iconOnly: InputSignal<boolean> = input(false);

    public icon: InputSignal<FoldIcon | undefined> = input();

    @HostBinding('class')
    get getClassName(): string[] {
        return [this.baseClassName, `${this.baseClassName}--${this.foldType()}`, `${this.baseClassName}--${this.shape()}`];
    }

    protected readonly isIconOnly: Signal<boolean> = computed((): boolean => {
        if (this.foldType() === 'tertiary' && this.shape() === 'square') {
            if (!this.icon()) {
                this.warnIconOnlyWithNoIcon();
                return false;
            }

            return true;
        }

        if (this.iconOnly() && !this.icon()) {
            this.warnIconOnlyWithNoIcon();
            return false;
        }

        return this.iconOnly();
    });

    private readonly baseClassName: string = 'fold-button';

    private warnIconOnlyWithNoIcon(): void {
        console.error(`<${this.baseClassName}> The button is icon only but no icon given`);
    }
}
