import { Routes } from '@angular/router';
import TabsComponent from './tabs.component';

const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
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
    ],
  },
];

export default tabsRoutes;
