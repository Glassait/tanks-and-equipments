import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tank-equipments',
    standalone: true,
    imports: [],
    templateUrl: './tank-equipments.component.html',
    styleUrl: './tank-equipments.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TankEquipmentsComponent {}
