import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';
import inventory from 'src/assets/json/inventory.json'

const routes: Routes = [
    { path: inventory.path.home, component: HomeComponent },
    { path: inventory.path.charsEtEquipements, component: TanksEquipmentComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
