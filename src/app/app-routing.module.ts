import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import inventory from 'src/assets/json/inventory.json';
import { AuthGuardService } from './commons/services/auth-guard.service';

import { ChangelogComponent } from './components/changelog/changelog.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { AgreementsComponent } from './pages/agreements/agreements.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { TanksEquipmentComponent } from './pages/tanks-equipments/tanks-equipment.component';

const routes: Routes = [
    {
        path: inventory.path.home,
        component: HomeComponent,
    },
    {
        path: inventory.path['tanks-and-equipments'],
        component: TanksEquipmentComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: inventory.path['clan-war'],
        component: ClanWarComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: inventory.path.changelog,
        component: ChangelogComponent,
    },
    {
        path: inventory.path.agreements,
        component: AgreementsComponent,
    },
    {
        path: 'sandbox',
        component: SandboxComponent,
    },
    {
        path: '**',
        redirectTo: inventory.path.home,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
