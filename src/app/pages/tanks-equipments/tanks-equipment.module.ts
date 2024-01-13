import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { TanksEquipmentRoutingModule } from './tanks-equipment-routing.module';
import { TanksEquipmentComponent } from './tanks-equipment.component';
import { TankEquipmentDescriptionComponent } from './tank-equipment-description/tank-equipment-description.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionPanelModule } from '../../components/expansion-panel/expansion-panel.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ButtonModule } from '../../components/button/button.module';
import { IconModule } from '../../components/icon/icon.module';

@NgModule({
    declarations: [TanksEquipmentComponent, TankEquipmentDescriptionComponent],
    imports: [
        CommonModule,
        TanksEquipmentRoutingModule,
        MatExpansionModule,
        ExpansionPanelModule,
        PipesModule,
        ButtonModule,
        IconModule,
        NgOptimizedImage,
    ],
})
export class TanksEquipmentModule {}
