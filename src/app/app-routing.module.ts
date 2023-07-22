import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { ClanMembersComponent } from './components/clan-members/clan-members.component';
import inventory from 'src/assets/json/inventory.json';
import { AuthGuard } from './commons/service/authGuard';

const routes: Routes = [
    {
        path: inventory.path.home,
        component: HomeComponent,
    },
    {
        path: inventory.path.charsEtEquipements,
        component: TanksEquipmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: inventory.path.charsEtEquipements,
        component: ClanWarComponent,
        canActivate: [AuthGuard],
    },
    {
        path: inventory.path.clanMembers,
        component: ClanMembersComponent,
        canActivate: [AuthGuard],
    },
    {
        path: inventory.path.clanWar,
        component: ClanWarComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
