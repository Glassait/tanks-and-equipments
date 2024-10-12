import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, type InputSignal, ViewEncapsulation } from '@angular/core';
import { default as Icons, type FoldIcon } from './icons-ts/icon.model';
import { FoldSize } from './icon.type';

@Component({
    selector: 'fold-icon',
    standalone: true,
    imports: [],
    template: ``,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldIconComponent {
    public icon: InputSignal<FoldIcon> = input.required();

    public size: InputSignal<FoldSize> = input(16 as FoldSize);

    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    constructor() {
        effect((): void => this.svgElementFromString(Icons[this.icon()]));
    }

    private svgElementFromString(svgContent: string): void {
        this.elementRef.nativeElement.innerHTML = svgContent;
        const svgElement: SVGSVGElement = this.elementRef.nativeElement.querySelector('svg')!;
        svgElement.setAttribute('width', String(this.size()));
        svgElement.setAttribute('height', String(this.size()));
        svgElement.style.display = 'block';
    }
}
