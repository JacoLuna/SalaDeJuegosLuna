import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./ahorcado/ahorcado.component').then((m) => m.AhorcadoComponent),
  }
];

export default routes