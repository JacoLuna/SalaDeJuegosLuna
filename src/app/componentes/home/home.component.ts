import { Component, Inject, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { User } from '../../classes/user/user/user';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [LoginComponent],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);

  constructor(private Auth: AuthenticationService) {}

  abrirJuegos(juego: number) {
    switch (juego) {
      case 0:
        this.router.navigate(['/games/ahorcado']);
        break;
      case 1:
        this.router.navigate(['/games/mayorMenor']);
        break;
    }
  }
}
