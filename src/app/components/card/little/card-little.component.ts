import { Component, Input } from '@angular/core';
import { IconsType } from '../../icon/types/icon.type';
import { IconColorEnum } from '../../icon/enums/icon-enum';

@Component({
    selector: 'card-little',
    templateUrl: './card-little.component.html',
})
export class CardLittleComponent {
    @Input() icon: IconsType | string;
    @Input() title: string;
    @Input() hasSpinner: boolean = false;
    @Input() showSpinner: boolean = false;
    @Input() id: string;
    @Input() darkMode: boolean = false;

    protected readonly IconColorEnum = IconColorEnum;
}
