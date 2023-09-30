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
import { FillEnum, IconColorEnum, StrokeEnum } from '../enums/icon-enum';
import { IconsType } from '../types/icons/icon.type';
import { Icon } from '../utils/icon.util';

@Component({
    selector: 'icon',
    template:
        '<div class="{{ svg?.isStroke ? strokeEnum[color] : fillEnum[color] }}"></div>',
})
export class IconComponent implements OnInit {
    @Input() icon: IconsType | string;
    @Input() size: number = 70;
    @Input() width: number;
    @Input() height: number;
    @Input() color: IconColorEnum;

    protected svg: Icon | undefined;

    protected readonly fillEnum = FillEnum;
    protected readonly strokeEnum = StrokeEnum;

    constructor(
        private iconRegistry: IconRegistryService,
        private element: ElementRef,
        @Optional() @Inject(DOCUMENT) private _document: any
    ) {}

    ngOnInit(): void {
        this.svg = this.iconRegistry.get(this.icon);
        this.element.nativeElement
            .querySelector('div')
            .appendChild(this._svgElementFromString(this.svg?.data));
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
