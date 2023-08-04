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

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
})
export class IconComponent implements OnInit {
    @Input() iconName: string;

    constructor(
        private iconRegistry: IconRegistryService,
        private element: ElementRef,
        @Optional() @Inject(DOCUMENT) private _document: any
    ) {}

    ngOnInit(): void {
        this.element.nativeElement
            .querySelector('div')
            .appendChild(
                this._svgElementFromString(this.iconRegistry.get(this.iconName))
            );
    }

    private _svgElementFromString(svgContent: string | undefined): SVGElement {
        if (!svgContent) {
            console.error(
                `Icon ${this.iconName} does not exist or is not registered`
            );
        }
        const div = this._document.createElement('div');
        div.innerHTML = svgContent;
        return div.querySelector('svg');
    }
}
