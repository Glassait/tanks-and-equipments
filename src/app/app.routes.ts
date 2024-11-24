import { Routes } from '@angular/router';
import { PathEnum } from 'core/enums/path.enum';

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
        title: "Page d'accueil",
    },
    {
        path: PathEnum.CHARS_EQUIPMENT,
        loadComponent: () => import('./modules/features/tank-equipments/tank-equipments.component').then(c => c.TankEquipmentsComponent),
        title: 'Chars et Équipements',
    },
];
