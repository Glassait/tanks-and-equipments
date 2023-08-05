import { DOCUMENT } from '@angular/common';
import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnInit,
    Optional,
} from '@angular/core';
import { IconRegistryService } from 'src/app/commons/services/icon-registry.service';
import { Icons } from 'src/app/commons/types/icon.type';

@Component({
    selector: 'icon',
    template: '<div class="{{ filter }}"></div>',
})
export class IconComponent implements OnInit {
    @Input() icon: Icons;
    @Input() size: number = 70;
    @Input() width: number;
    @Input() height: number;
    @Input() color: 'white' | 'black';

    protected filter: string;

    constructor(
        private iconRegistry: IconRegistryService,
        private element: ElementRef,
        @Optional() @Inject(DOCUMENT) private _document: any
    ) {}

    ngOnInit(): void {
        this.filter =
            this.color === 'white'
                ? 'brightness-0 contrast-[106%] hue-rotate-[81deg] invert-[100%] saturate-[100%] sepia-[3%] filter'
                : '';

        this.element.nativeElement
            .querySelector('div')
            .appendChild(
                this._svgElementFromString(this.iconRegistry.get(this.icon))
            );
    }

    private _svgElementFromString(svgContent: string | undefined): SVGElement {
        if (!svgContent) {
            console.error(
                `Icon ${this.icon} does not exist or is not registered`
            );
        }
        const div = this._document.createElement('div');
        div.innerHTML = svgContent;
        const svgElement = div.querySelector('svg');
        svgElement.setAttribute('width', this.width ? this.width : this.size);
        svgElement.setAttribute('height', this.height ? this.height : this.size);
        svgElement.style.display = 'block';
        return svgElement;
    }
}
