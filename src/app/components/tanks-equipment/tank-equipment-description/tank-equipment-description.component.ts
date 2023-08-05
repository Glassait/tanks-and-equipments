import { Component, Input, OnInit } from '@angular/core';
import { ModeStore } from 'src/app/commons/stores/mode.store';
import { TankData } from 'src/app/commons/types/tanks-data.type';
import { ModeInterface } from '../../../commons/interfaces/mode.interface';

@Component({
    selector: 'app-tank-equipment-description',
    templateUrl: './tank-equipment-description.component.html',
})
export class TankEquipmentDescriptionComponent implements OnInit {
    @Input() tankData: TankData;

    protected isDark: boolean;

    constructor(private modeStore: ModeStore) {}

    ngOnInit(): void {
        this.modeStore
            .watch()
            .subscribe((modeInterface: ModeInterface): void => {
                this.isDark = modeInterface.dark;
            });
    }
}
