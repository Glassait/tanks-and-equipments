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
    template: '<div class="{{ fillString }}"></div>',
})
export class IconComponent implements OnInit, OnChanges {
    @Input() icon: Icons | string;
    @Input() size: number = 70;
    @Input() width: number;
    @Input() height: number;
    @Input() fill: 'white' | 'black';

    protected fillString: string;

    private blackFill: string = 'fill-secondary_light';
    private whiteFill: string = 'fill-secondary_dark';

    constructor(
        private iconRegistry: IconRegistryService,
        private element: ElementRef,
        @Optional() @Inject(DOCUMENT) private _document: any
    ) {}

    ngOnInit(): void {
        this.setFillStr();

        this.element.nativeElement
            .querySelector('div')
            .appendChild(
                this._svgElementFromString(this.iconRegistry.get(this.icon))
            );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['fill'] && changes['fill']['currentValue']) {
            this.setFillStr();
        }
    }

    private setFillStr(): void {
        if (this.fill) {
            this.fillString =
                this.fill === 'white' ? this.whiteFill : this.blackFill;
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
