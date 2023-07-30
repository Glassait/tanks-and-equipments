import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    FieldComposant,
    TankData,
} from 'src/app/commons/types/tanks-data.type';

@Component({
    selector: 'app-tank-equipment-description',
    templateUrl: './tank-equipment-description.component.html',
})
export class TankEquipmentDescriptionComponent implements OnChanges {
    @Input() tankData: TankData;

    ngOnChanges(changes: SimpleChanges): void {
        this.tankData = changes['tankData']['currentValue'];
    }

    protected getURL(field: FieldComposant) {
        return `/assets/fields/${field.image}${
            field.active ? '' : '.disabled'
        }.png`;
    }
}
