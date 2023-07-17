import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

// @Component({
//     selector: 'app-tank-small',
//     templateUrl: './tank-small.component.html',
// })
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
        if (
            changes['idClick'].currentValue !== this.id &&
            changes['idClick'].currentValue !== -1
        ) {
            this.arrowToTop();
        }
    }

    public onClick(): void {
        this.updateArrow();
        this.emitterForClick.emit(
            this.arrowClass === this.stateArrow.top ? -1 : this.id
        );
    }

    private updateArrow(): void {
        this.arrowClass =
            this.arrowClass === this.stateArrow.top
                ? this.stateArrow.bottom
                : this.stateArrow.top;
    }

    private arrowToTop(): void {
        this.arrowClass = this.stateArrow.top;
    }
}
