import { Routes } from '@angular/router';

const tabsRoutes: Routes = [
  {
    path: 'showcase',
    loadComponent: () => import('../showcase/showcase.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('../home/home.component'),
  },
  {
    path: 'settings',
    loadComponent: () => import('../settings/settings.component'),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

export default tabsRoutes;
