import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TanksEquipmentComponent } from './tanks-equipment.component';

const routes: Routes = [{ path: '', component: TanksEquipmentComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TanksEquipmentRoutingModule {}
