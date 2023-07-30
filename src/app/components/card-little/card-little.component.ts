import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-little',
    templateUrl: './card-little.component.html',
})
export class CardLittleComponent {
    @Input() iconPath: string | URL;
    @Input() title: string;
    @Input() hasSpinner: boolean = false;
    @Input() showSpinner: boolean = false;
    @Input() id: string;
}
