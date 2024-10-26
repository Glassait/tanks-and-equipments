import { Routes } from '@angular/router';

/**
 * Contain all the path of the website.
 *
 * @lazy-loading
 * The most of the routes use lazy loading ([see more](https://angular.dev/reference/migrations/route-lazy-loading#))
 */
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/features/home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'chars-et-equipements',
        pathMatch: 'full',
        redirectTo: '/',
    },
];
