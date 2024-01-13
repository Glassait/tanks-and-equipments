import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, numberAttribute, OnInit, Optional } from '@angular/core';
import { IconRegistryService } from '../../commons/services/icon-registry.service';
import { Icon } from '../../commons/utils/icon.util';
import { FillEnum, IconColorEnum, StrokeEnum } from './enums/icon-enum';
import { IconsType } from './types/icon.type';

/**
 * This component manage all the icon
 * @example <icon [color]='IconColorEnum.DARK' icon='changelog' size='18'></icon>
 */
@Component({
    standalone: true,
    selector: 'glassait-icon',
    template: '<div class="{{ svg?.isStroke ? StrokeEnum[color] : FillEnum[color] }}"></div>',
})
export class IconComponent implements OnInit {
    //region INPUT
    /**
     * This svg icon<p>
     * ! If the icon is not registered is the {@link IconRegistryService}, throw an error
     * @example <glassait-icon icon='changelog'></icon>
     */
    @Input({ required: true }) icon: IconsType | string;
    /**
     * The size in px of the icon<p>
     * ! Is override by width and height
     * @example <glassait-icon size='18'></glassait-icon>
     * @example <glassait-icon [size]='18'></glassait-icon>
     * @default 70
     * @implements numberAttribute
     */
    @Input({ transform: numberAttribute }) size: number = 70;
    /**
     * The width in px of the icon
     * @example <glassait-icon width='18'></glassait-icon>
     * @example <glassait-icon [width]='18'></glassait-icon>
     * @override size
     * @implements numberAttribute
     */
    @Input({ transform: numberAttribute }) width: number;
    /**
     * The height in px of the icon
     * @example <glassait-icon height='18'></glassait-icon>
     * @example <glassait-icon [height]='18'></glassait-icon>
     * @override size
     * @implements numberAttribute
     */
    @Input({ transform: numberAttribute }) height: number;
    /**
     * The color of the icon
     * @example <glassait-icon [color]='IconColorEnum.DARK'></glassait-icon>
     */
    @Input({ required: true }) color: IconColorEnum;
    //endregion

    //region PROTECTED FIELD
    /**
     * All the data of the icon, gotten from {@link IconRegistryService}
     * @protected
     */
    protected svg: Icon | undefined;
    //endregion

    //region ENUM
    protected readonly FillEnum = FillEnum;
    protected readonly StrokeEnum = StrokeEnum;

    //endregion

    constructor(
        private iconRegistry: IconRegistryService,
        private element: ElementRef,
        @Optional() @Inject(DOCUMENT) private _document: any
    ) {}

    /**
     * Implementation of the {@link OnInit} interface
     */
    ngOnInit(): void {
        this.svg = this.iconRegistry.get(this.icon);
        this.element.nativeElement.querySelector('div').appendChild(this._svgElementFromString(this.svg?.data));
    }

    /**
     * Transform the typescript icon to html icon
     * @param svgContent The svg to put in the html
     * @throws Error When the icon does not exist or is not registered
     * @private
     */
    private _svgElementFromString(svgContent: string | undefined): SVGElement {
        if (!svgContent) {
            throw new Error(`Icon ${this.icon} does not exist or is not registered`);
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
