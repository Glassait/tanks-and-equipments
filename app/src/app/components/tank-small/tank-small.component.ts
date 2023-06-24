import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-tank-small',
    templateUrl: './tank-small.component.html',
    styleUrls: ['./tank-small.component.css'],
})
export class TankSmallComponent implements OnChanges {
    @Input() data: any;
    @Input() id: number | undefined;
    @Input() idClick: number | undefined;
    @Output() emitterForClick: EventEmitter<number> =
        new EventEmitter<number>();

    public arrowClass: string | undefined;

    private stateArrow = {
        bottom: 'rotate-0',
        top: 'rotate-180',
    };

    constructor() {
        this.arrowClass = this.stateArrow.top;
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);

        if (
            changes['idClick'].currentValue !== this.id &&
            changes['idClick'].currentValue !== -1
        ) {
            console.log('change arrow class');

            this.arrowClass = this.stateArrow.top;
        }
    }

    public onClick(): void {
        this.updateArrow();
        this.emitterForClick.emit(
            this.arrowClass === this.stateArrow.top ? -1 : this.id
        );
    }

    private updateArrow() {
        this.arrowClass =
            this.arrowClass === this.stateArrow.top
                ? this.stateArrow.bottom
                : this.stateArrow.top;
    }
}
