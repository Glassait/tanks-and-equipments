import { Component, Input } from '@angular/core';
import { IconColorEnum } from '../../../commons/enums/icon-enum';
import { IconsType } from '../../../commons/types/icons/icon.type';

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
