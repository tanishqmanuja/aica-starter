import { Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.component'),
    loadChildren: () => import('./tabs/tabs.routes'),
  },
];

export default appRoutes;
