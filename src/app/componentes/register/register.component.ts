import { Component, ViewChild, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(public Auth: AuthenticationService, private router: Router) {}
  
  correo!: string;
  clave!: string;
  clave2!: string;
  err: boolean = false;
  toastScv = inject(ToastrService);

  async register() {
    if(this.clave == this.clave2){

      const user = await this.Auth.register(
        this.correo,
        this.clave
      ).then(r => {
        const user = this.Auth.loginUser( this.correo, this.clave).
        then(Response => {
          this.router.navigate(['/home']);
        })
      }).catch( (e:Error) => {
        this.err = true
        console.log(e);
        this.toastScv.error('Ya existe una cuenta con ese mail');
      });
    }else{
      console.log("las contraseñas no coinciden");

    }
  }
}
