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
import { FoldSize } from './icon.type';

@Component({
    selector: 'fold-icon',
    standalone: true,
    template: ``,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldIconComponent {
    public icon: InputSignal<FoldIcon> = input.required();

    public size: InputSignal<FoldSize> = input(16 as FoldSize);

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
        const svg: SVGSVGElement = this.elementRef.nativeElement.querySelector('svg')!;
        svg.setAttribute('width', String(this.size()));
        svg.setAttribute('height', String(this.size()));
        svg.style.display = 'block';
    }
}
