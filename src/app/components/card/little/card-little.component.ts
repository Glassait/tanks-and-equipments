import { Component, Input } from '@angular/core';
import { IconColorEnum } from '../../../commons/enums/icon-enum';
import { Icons } from '../../../commons/types/icon.type';

@Component({
    selector: 'card-little',
    templateUrl: './card-little.component.html',
})
export class CardLittleComponent {
    @Input() icon: Icons | string;
    @Input() title: string;
    @Input() hasSpinner: boolean = false;
    @Input() showSpinner: boolean = false;
    @Input() id: string;
    @Input() darkMode: boolean = false;

    protected readonly IconColorEnum = IconColorEnum;
}
