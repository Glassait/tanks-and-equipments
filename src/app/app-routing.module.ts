import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import inventory from 'src/assets/json/inventory.json';
import { AuthGuardService } from './commons/services/auth-guard.service';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { ClanWarComponent } from './components/clan-war/clan-war.component';
import { HomeComponent } from './components/home/home.component';
import { TanksEquipmentComponent } from './components/tanks-equipment/tanks-equipment.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';

const routes: Routes = [
    {
        path: inventory.path.home,
        component: HomeComponent,
    },
    {
        path: inventory.path.charsEtEquipements,
        component: TanksEquipmentComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: inventory.path.clanWar,
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
