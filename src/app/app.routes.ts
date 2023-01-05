import { Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes'),
  },
];

export default appRoutes;
