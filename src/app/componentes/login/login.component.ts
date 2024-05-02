import { Component, EventEmitter, Output, inject, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message';

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
  
  constructor(public Auth: AuthenticationService, public msg: MessageService) {}

  async Login() {
    await this.Auth.loginUser(this.correo, this.clave).
    then( () => {
      this.router2.navigate(['/home']);
    }).catch( error => {
      console.log(error);
    })
  }
  ingresoRapido(){
    this.correo = "usuario1@gmail.com";
    this.clave = "123456";
  }
}
