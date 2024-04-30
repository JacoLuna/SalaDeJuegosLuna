import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(public Auth: AuthenticationService, private router: Router) {}

  correo!: string;
  clave!: string;
  clave2!: string;

  async register() {
    if(this.clave == this.clave2){
      try {
        const user = await this.Auth.register(
          this.correo,
          this.clave
        ).then(r => {

          const user = this.Auth.loginUser( this.correo, this.clave).
          then(Response => {
            this.router.navigate(['/home']);
          })

        });
      } catch (e) {
        console.log(e)
      }
    }else{
      console.log("las contraseñas no coinciden");
    }
  }
}
