import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    HostBinding,
    inject,
    input,
    type InputSignal,
    type Signal,
    ViewEncapsulation,
} from '@angular/core';
import { FoldIconComponent } from '../icon/fold-icon.component';
import type { FoldButtonShape, FoldButtonType } from './button.type';
import type { FoldIcon } from '../icon/icons-ts/icon.model';

@Component({
    selector: 'button[fold-button], a[fold-button]',
    templateUrl: './fold-button.component.html',
    styleUrl: './fold-button.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [FoldIconComponent],
})
export class FoldButtonComponent {
    public variant: InputSignal<FoldButtonType> = input.required();

    public shape: InputSignal<FoldButtonShape> = input.required();

    public iconOnly: InputSignal<boolean> = input(false);

    public icon: InputSignal<FoldIcon | undefined> = input();

    @HostBinding('class')
    get cssClasses(): string[] {
        return [this.baseCssClass, `${this.baseCssClass}--${this.variant()}`, `${this.baseCssClass}--${this.shape()}`];
    }

    protected readonly isIconOnly: Signal<boolean> = computed((): boolean => {
        const hasIcon: boolean = !!this.icon();
        const isTertiarySquare: boolean = this.variant() === 'tertiary' && this.shape() === 'square';
        const isIconOnly: boolean = isTertiarySquare || this.iconOnly();

        if (isIconOnly && !hasIcon) {
            console.error(
                `<${this.baseCssClass}> The button is icon only but no icon given, please provide icon name (ex: <button foldButton icon="accountCircle"></button>)`
            );
            return false;
        }

        if (isIconOnly && !this.elementRef.nativeElement.ariaLabel) {
            console.error(
                `<${this.baseCssClass}> The button is icon only, please provide ariaLabel (ex:  <button foldButton aria-label="Fermer">...</button>)`
            );
        }

        return isIconOnly;
    });

    private readonly baseCssClass: string = 'fold-button';

    private readonly elementRef: ElementRef<HTMLButtonElement | HTMLAnchorElement> = inject(ElementRef);
}
