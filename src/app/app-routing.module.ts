import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import inventory from 'src/assets/json/inventory.json';
import { AuthGuardService } from './commons/services/auth-guard.service';

const routes: Routes = [
    {
        path: inventory.path.home,
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },
    {
        path: inventory.path['tanks-and-equipments'],
        loadChildren: () => import('./pages/tanks-equipments/tanks-equipment.module').then(m => m.TanksEquipmentModule),
        canActivate: [AuthGuardService],
    },
    {
        path: inventory.path['clan-war'],
        loadChildren: () => import('./components/clan-war/clan-war.module').then(m => m.ClanWarModule),
        canActivate: [AuthGuardService],
    },
    {
        path: inventory.path.changelog,
        loadChildren: () => import('./pages/changelog/changelog.module').then(m => m.ChangelogModule),
    },
    /*    {
        path: inventory.path.agreements,
        loadChildren: () => import('./pages/agreements/agreements.module').then(m => m.AgreementsModule)
    },*/
    {
        path: 'sandbox',
        loadChildren: () => import('./pages/sandbox/sandbox.module').then(m => m.SandboxModule),
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
