import { DOCUMENT } from '@angular/common';
import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Optional,
    SimpleChanges,
} from '@angular/core';
import { IconRegistryService } from 'src/app/commons/services/icon-registry.service';
import { Icons } from 'src/app/commons/types/icon.type';

@Component({
    selector: 'icon',
    template: '<div class="{{ filterString }}"></div>',
})
export class IconComponent implements OnInit, OnChanges {
    @Input() icon: Icons | string;
    @Input() size: number = 70;
    @Input() width: number;
    @Input() height: number;
    @Input() color: 'white' | 'black';
    @Input() filter: 'white' | 'black';

    protected filterString: string;

    private blackFilter: string =
        'brightness-black contrast-black hue-rotate-black invert-black saturate-black sepia-black';
    private whiteFilter: string =
        'brightness-white contrast-white hue-rotate-white invert-white saturate-white sepia-white';

    constructor(
        private iconRegistry: IconRegistryService,
        private element: ElementRef,
        @Optional() @Inject(DOCUMENT) private _document: any
    ) {}

    ngOnInit(): void {
        this.setFilterStr();

        this.element.nativeElement
            .querySelector('div')
            .appendChild(
                this._svgElementFromString(this.iconRegistry.get(this.icon))
            );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['filter'] && changes['filter']['currentValue']) {
            this.setFilterStr();
        }
    }

    private setFilterStr(): void {
        if (this.color) {
            this.filterString =
                this.color === 'white' ? this.whiteFilter : this.blackFilter;
        } else if (this.filter) {
            this.filterString =
                this.filter === 'white' ? this.whiteFilter : this.blackFilter;
        }
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
        svgElement.setAttribute(
            'height',
            this.height ? this.height : this.size
        );
        svgElement.style.display = 'block';
        return svgElement;
    }
}
