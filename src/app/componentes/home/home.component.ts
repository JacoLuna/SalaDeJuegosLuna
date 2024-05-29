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
import Swal from 'sweetalert2'
import { FirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [LoginComponent],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  router = inject(Router);
  isLogged: boolean = false;
  mail!: string | null;

  constructor(private Auth: AuthenticationService) {}

  ngOnInit(): void {
    this.Auth.userLogged.subscribe(userLogged => {
      if(userLogged){
        console.log("A");
        this.isLogged = true;
        this.mail = userLogged.email;
      }
    });
  }

  abrirJuegos(juego: number) {
    if(this.isLogged){
      switch (juego) {
        case 0:
          this.router.navigate(['/games/ahorcado']);
          break;
        case 1:
          this.router.navigate(['/games/mayorMenor']);
          break;
        case 2:
          console.log("A");
          this.router.navigate(['/games/dadosLocos']);
          break;
        case 3:
          this.router.navigate(['/games/preguntados']);
          break;
      }
    }else{
      
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Debes estar logeado para jugar",
      });
    }
  }
}
