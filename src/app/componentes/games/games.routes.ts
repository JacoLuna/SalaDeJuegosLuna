import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('../games/ahorcado/ahorcado.component').then((m) => m.AhorcadoComponent),
  },
  {
    path: 'mayorMenor',
    loadComponent: () =>
      import('../games/mayor-menor/mayor-menor.component').then((m) => m.MayorMenorComponent),
  }
];

export default routes;