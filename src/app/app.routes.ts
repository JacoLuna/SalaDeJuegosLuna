import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { WhoAmIComponent } from './componentes/who-am-i/who-am-i.component';
// import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo } from "@angular/fire/auth-guard"

export const routes: Routes = [
  { path: 'whoAmI', component: WhoAmIComponent },
  { path: 'logIn', component: LoginComponent },
  {
    path: 'Home',
    loadComponent: () =>
      import('./componentes/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./componentes/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./componentes/register/register.component').then(
        (m) => m.RegisterComponent
      )
  },
  {
    path: 'games',
    loadChildren: () => import('./componentes/games/games.routes'),
  },

  { path: '**', component: HomeComponent },
];
