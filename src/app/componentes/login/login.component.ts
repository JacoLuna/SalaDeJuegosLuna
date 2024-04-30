import { Component, EventEmitter, Output, inject, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../classes/user/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  correo!: string;
  clave!: string;
  router2 = inject(Router);
  
  constructor(public Auth: AuthenticationService) {}

  async Login() {
    const user = await this.Auth.loginUser(this.correo, this.clave).
    then(Response => {
      this.router2.navigate(['/home']);
    }).catch( error => {
      console.log(error);
    })
  }

}
