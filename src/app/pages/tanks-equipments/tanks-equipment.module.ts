import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { TanksEquipmentRoutingModule } from './tanks-equipment-routing.module';
import { TanksEquipmentComponent } from './tanks-equipment.component';
import { TankEquipmentDescriptionComponent } from './tank-equipment-description/tank-equipment-description.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { ImagePipe } from '../../pipes/image.pipe';
import { ButtonComponent } from '../../components/button/button.component';
import { IconComponent } from '../../components/icon/icon.component';
import { FieldUrlPipe } from '../../pipes/url.pipe';

@NgModule({
    declarations: [TanksEquipmentComponent, TankEquipmentDescriptionComponent],
    imports: [
        CommonModule,
        TanksEquipmentRoutingModule,
        MatExpansionModule,
        NgOptimizedImage,
        ExpansionPanelComponent,
        ImagePipe,
        ButtonComponent,
        IconComponent,
        FieldUrlPipe,
    ],
})
export class TanksEquipmentModule {}
