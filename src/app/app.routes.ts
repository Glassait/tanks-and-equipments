import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/features/home/home.component').then(c => c.HomeComponent),
    },
];
