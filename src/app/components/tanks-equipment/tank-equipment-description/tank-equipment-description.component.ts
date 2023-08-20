import { Component, Input } from '@angular/core';
import { TankData } from 'src/app/commons/types/tanks-data.type';
import { FillEnum } from '../../../commons/enums/fill.enum';

@Component({
    selector: 'app-tank-equipment-description',
    templateUrl: './tank-equipment-description.component.html',
})
export class TankEquipmentDescriptionComponent {
    @Input() tankData: TankData;
    @Input() isDark: boolean;
    @Input() isMobile: boolean;

    protected readonly FillEnum = FillEnum;
}
