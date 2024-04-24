import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { WhoAmIComponent } from './componentes/who-am-i/who-am-i.component';

export const routes: Routes = [
  { path: 'whoAmI',  component: WhoAmIComponent },
  {path: 'logIn', component: LoginComponent},
  {
    path: 'Home',
    loadComponent: () => 
        import('./componentes/home/home.component').then((m) => m.HomeComponent),
  },

//   { path: 'error', component: ErrorComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('./componentes/login/login.component').then((m) => m.LoginComponent),
  },

  { path: '**', component: HomeComponent },
];
