import {
    ChangeDetectionStrategy,
    Component,
    effect,
    ElementRef,
    HostBinding,
    inject,
    input,
    type InputSignal,
    ViewEncapsulation,
} from '@angular/core';
import { default as Icons, type FoldIcon } from './icons-ts/icon.model';
import { FoldIconSize } from './icon.type';

@Component({
    selector: 'fold-icon',
    template: ``,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FoldIconComponent {
    public icon: InputSignal<FoldIcon> = input.required();

    /**
     * @default 16
     */
    public size: InputSignal<FoldIconSize> = input(16 as FoldIconSize);

    @HostBinding('attr.aria-hidden')
    get ariaHidden(): boolean {
        return true;
    }

    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    constructor() {
        effect((): void => this.injectSVGToHtml(Icons[this.icon()]));
    }

    private injectSVGToHtml(svgContent: string): void {
        this.elementRef.nativeElement.innerHTML = svgContent;
        const svg: SVGSVGElement | null = this.elementRef.nativeElement.querySelector('svg');

        if (svg) {
            svg.setAttribute('width', String(this.size()));
            svg.setAttribute('height', String(this.size()));
            svg.style.display = 'block';
        } else {
            console.error(
                `<fold-icon> No svg element found, ${this.icon()} does not exist, please provide correct icon contain in FoldIcon (ex: <fold-icon icon="accountCircle"></fold-icon>)`
            );
        }
    }
}
