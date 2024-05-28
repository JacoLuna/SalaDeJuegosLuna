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
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('../games/preguntados/preguntados.component').then((m) => m.PreguntadosComponent),
  },
  {
    path: 'dadosLocos',
    loadComponent: () =>
      import('../games/dados-locos/dados-locos.component').then((m) => m.DadosLocosComponent),
  }
];

export default routes;