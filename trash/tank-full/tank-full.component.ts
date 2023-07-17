import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { scrollTarget } from 'src/app/class/global';

// @Component({
//     selector: 'app-tank-full',
//     templateUrl: './tank-full.component.html',
// })
export class TankFullComponent implements OnChanges {
    @Input() data: any;
    @Input() numerous: number | undefined;
    @Input() idClick: number | undefined;

    public divClass: string;

    private stateDiv = {
        show: 'flex',
        hidden: 'hidden',
    };

    constructor() {
        this.divClass = this.stateDiv.hidden;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idClick'].currentValue === this.numerous) {
            this.updateDivClass();
        } else {
            this.hideDiv();
        }
        this.scrollToComponant();
    }

    private updateDivClass(): void {
        this.divClass =
            this.divClass === this.stateDiv.hidden
                ? this.stateDiv.show
                : this.stateDiv.hidden;
    }

    private hideDiv(): void {
        this.divClass = this.stateDiv.hidden;
    }

    private scrollToComponant() {
        if (this.divClass === this.stateDiv.show) {
            setTimeout(() => {
                document
                    .getElementById(`${scrollTarget}_${this.numerous}`)
                    ?.scrollIntoView(false);
            }, 1);
        }
    }
}
